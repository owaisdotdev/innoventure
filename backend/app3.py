from flask import Flask, request, jsonify
from transformers import AutoTokenizer, AutoModel
import torch
import torch.nn.functional as F
import requests

# Initialize Flask app
app = Flask(__name__)
print("hello")
# Load model and tokenizer once when the application starts
tokenizer = AutoTokenizer.from_pretrained('sentence-transformers/all-MiniLM-L6-v2')
model = AutoModel.from_pretrained('sentence-transformers/all-MiniLM-L6-v2')
print("hello")
# Mean Pooling - Take attention mask into account for correct averaging
def mean_pooling(model_output, attention_mask):
    token_embeddings = model_output[0]  # First element of model_output contains all token embeddings
    input_mask_expanded = attention_mask.unsqueeze(-1).expand(token_embeddings.size()).float()
    return torch.sum(token_embeddings * input_mask_expanded, 1) / torch.clamp(input_mask_expanded.sum(1), min=1e-9)

# Function to fetch data from external APIs
def fetch_data(api_url):
    response = requests.get(api_url)
    if response.status_code != 200:
        raise Exception(f"Failed to fetch data from {api_url}")
    return response.json()

# Function to compute cosine similarity and return top 10 results
def compute_similarity(target_description, descriptions, ids, top_n=10):
    all_descriptions = [target_description] + descriptions
    encoded_input = tokenizer(all_descriptions, padding=True, truncation=True, return_tensors='pt')
    with torch.no_grad():
        model_output = model(**encoded_input)
    embeddings = mean_pooling(model_output, encoded_input['attention_mask'])
    embeddings = F.normalize(embeddings, p=2, dim=1)
    target_embedding = embeddings[0]
    other_embeddings = embeddings[1:]
    similarities = F.cosine_similarity(target_embedding.unsqueeze(0), other_embeddings, dim=1).tolist()
    print(similarities)
    sorted_indices = sorted(range(len(similarities)), key=lambda i: similarities[i], reverse=True)
    top_results = [{"id": ids[i], "description": descriptions[i], "similarity": similarities[i]} for i in sorted_indices[:top_n]]
    return top_results

@app.route('/match', methods=['POST'])
def match():
    try:
        data = request.json
        startup_id = data.get('startup_id')
        investor_id = data.get('investor_id')

        if not startup_id and not investor_id:
            return jsonify({"error": "Please provide either a startup_id or an investor_id."}), 400

        if startup_id:
            # Fetch startup description
            startups_data = fetch_data('https://innoventure-api.vercel.app/startups')
            startup = next((s for s in startups_data if s.get("_id") == startup_id), None)
            if not startup:
                return jsonify({"error": "Startup not found"}), 404
            startup_description = startup.get("businessPlan", {}).get("description", "")
            print(startup_description)
            # Fetch all investors
            investors_data = fetch_data('https://innoventure-api.vercel.app/investors')
            investor_descriptions = [inv.get("businessPlan", {}).get("description", "") for inv in investors_data]
            investor_ids = [inv.get("_id") for inv in investors_data]
            print(investor_ids)
            # Compute similarities
            top_investors = compute_similarity(startup_description, investor_descriptions, investor_ids)

            return jsonify({
                "startup": {"_id": startup_id, "description": startup_description},
                "potential_investors": top_investors
            })

        elif investor_id:
            # Fetch investor description
            investors_data = fetch_data('https://innoventure-api.vercel.app/investors')
            investor = next((inv for inv in investors_data if inv.get("_id") == investor_id), None)
            if not investor:
                return jsonify({"error": "Investor not found"}), 404
            investor_description = investor.get("businessPlan", {}).get("description", "")
            
            # Fetch all startups
            startups_data = fetch_data('https://innoventure-api.vercel.app/startups')
            startup_descriptions = [s.get("businessPlan", {}).get("description", "") for s in startups_data]
            startup_ids = [s.get("_id") for s in startups_data]

            # Compute similarities
            top_startups = compute_similarity(investor_description, startup_descriptions, startup_ids)

            return jsonify({
                "investor": {"_id": investor_id, "description": investor_description},
                "potential_startups": top_startups
            })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8080, debug=True)
