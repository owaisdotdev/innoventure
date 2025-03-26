# from flask import Flask, request, jsonify
# from transformers import AutoTokenizer, AutoModel
# import torch
# import torch.nn.functional as F
# import requests
# from dotenv import load_dotenv
# import os
# from flask_cors import CORS

# # Load environment variables from .env file
# load_dotenv()

# # Initialize Flask app
# app = Flask(__name__)
# CORS(app, resources={r"/match": {"origins": "http://localhost:5173"}})

# print("hello")

# # Load model and tokenizer once when the application starts
# tokenizer = AutoTokenizer.from_pretrained('sentence-transformers/all-MiniLM-L6-v2')
# model = AutoModel.from_pretrained('sentence-transformers/all-MiniLM-L6-v2')
# print("hello")

# # Get environment variables
# PORT = os.getenv('FLASK_PORT', 8080)
# STARTUPS_API_URL = os.getenv('STARTUPS_API_URL', 'https://innoventure-api.vercel.app/startups')
# INVESTORS_API_URL = os.getenv('INVESTORS_API_URL', 'https://innoventure-api.vercel.app/investors')

# # Mean Pooling - Take attention mask into account for correct averaging
# def mean_pooling(model_output, attention_mask):
#     token_embeddings = model_output[0]
#     input_mask_expanded = attention_mask.unsqueeze(-1).expand(token_embeddings.size()).float()
#     return torch.sum(token_embeddings * input_mask_expanded, 1) / torch.clamp(input_mask_expanded.sum(1), min=1e-9)

# # Function to fetch data from external APIs
# def fetch_data(api_url):
#     response = requests.get(api_url)
#     if response.status_code != 200:
#         raise Exception(f"Failed to fetch data from {api_url}")
#     return response.json()

# # Function to compute cosine similarity and return top 10 results
# def compute_similarity(target_description, descriptions, ids, top_n=10):
#     all_descriptions = [target_description] + descriptions
#     encoded_input = tokenizer(all_descriptions, padding=True, truncation=True, return_tensors='pt')
#     with torch.no_grad():
#         model_output = model(**encoded_input)
#     embeddings = mean_pooling(model_output, encoded_input['attention_mask'])
#     embeddings = F.normalize(embeddings, p=2, dim=1)
#     target_embedding = embeddings[0]
#     other_embeddings = embeddings[1:]
#     similarities = F.cosine_similarity(target_embedding.unsqueeze(0), other_embeddings, dim=1).tolist()
#     print(f"Similarities: {similarities}")
#     sorted_indices = sorted(range(len(similarities)), key=lambda i: similarities[i], reverse=True)
#     top_results = [{"id": ids[i], "description": descriptions[i], "similarity": similarities[i]} for i in sorted_indices[:top_n]]
#     return top_results

# @app.route('/match', methods=['POST'])
# def match():
#     print("Received request at /match")  # Debug log
#     try:
#         data = request.json
#         print(f"Request data: {data}")  # Debug log
#         startup_id = data.get('startup_id')
#         investor_id = data.get('investor_id')

#         if not startup_id and not investor_id:
#             return jsonify({"error": "Please provide either a startup_id or an investor_id."}), 400

#         if startup_id:
#             startups_data = fetch_data(STARTUPS_API_URL)
#             startup = next((s for s in startups_data if s.get("_id") == startup_id), None)
#             if not startup:
#                 return jsonify({"error": "Startup not found"}), 404
#             startup_description = startup.get("businessPlan", {}).get("description", "")
#             print(f"Startup description: {startup_description}")
#             investors_data = fetch_data(INVESTORS_API_URL)
#             investor_descriptions = [inv.get("businessPlan", {}).get("description", "") for inv in investors_data]
#             investor_ids = [inv.get("_id") for inv in investors_data]
#             print(f"Investor IDs: {investor_ids}")
#             top_investors = compute_similarity(startup_description, investor_descriptions, investor_ids)
#             return jsonify({
#                 "startup": {"_id": startup_id, "description": startup_description},
#                 "potential_investors": top_investors
#             })

#         elif investor_id:
#             investors_data = fetch_data(INVESTORS_API_URL)
#             investor = next((inv for inv in investors_data if inv.get("_id") == investor_id), None)
#             if not investor:
#                 return jsonify({"error": "Investor not found"}), 404
#             investor_description = investor.get("businessPlan", {}).get("description", "")
#             print(f"Investor description: {investor_description}")
#             startups_data = fetch_data(STARTUPS_API_URL)
#             startup_descriptions = [s.get("businessPlan", {}).get("description", "") for s in startups_data]
#             startup_ids = [s.get("_id") for s in startups_data]
#             print(f"Startup IDs: {startup_ids}")
#             top_startups = compute_similarity(investor_description, startup_descriptions, startup_ids)
#             return jsonify({
#                 "investor": {"_id": investor_id, "description": investor_description},
#                 "potential_startups": top_startups
#             })

#     except Exception as e:
#         print(f"Error: {str(e)}")  # Debug log
#         return jsonify({"error": str(e)}), 500

# if __name__ == '__main__':
#     app.run(host="0.0.0.0", port=int(PORT), debug=True)
from flask import Flask, request, jsonify
from transformers import AutoTokenizer, AutoModel
import torch
import torch.nn.functional as F
import requests
from dotenv import load_dotenv
import os
from flask_cors import CORS

load_dotenv()
app = Flask(__name__)
CORS(app, resources={r"/match": {"origins": "http://localhost:5173", "methods": ["POST", "OPTIONS"]}})

tokenizer = AutoTokenizer.from_pretrained('sentence-transformers/all-MiniLM-L6-v2')
model = AutoModel.from_pretrained('sentence-transformers/all-MiniLM-L6-v2')

PORT = os.getenv('FLASK_PORT', 8080)
STARTUPS_API_URL = os.getenv('STARTUPS_API_URL', 'https://innoventure-api.vercel.app/startups')
INVESTORS_API_URL = os.getenv('INVESTORS_API_URL', 'https://innoventure-api.vercel.app/investors')

def mean_pooling(model_output, attention_mask):
    token_embeddings = model_output[0]
    input_mask_expanded = attention_mask.unsqueeze(-1).expand(token_embeddings.size()).float()
    return torch.sum(token_embeddings * input_mask_expanded, 1) / torch.clamp(input_mask_expanded.sum(1), min=1e-9)

def fetch_data(api_url):
    print(f"Fetching data from {api_url}")
    response = requests.get(api_url)
    print(f"Response status code: {response.status_code}")
    if response.status_code != 200:
        raise Exception(f"Failed to fetch data from {api_url}, status code: {response.status_code}")
    data = response.json()
    print(f"Fetched data length: {len(data)} items")
    return data

def compute_similarity(target_profile, profiles, ids, top_n=10):
    print(f"Computing similarity for target profile: {target_profile[:50]}...")  # Truncate for readability
    print(f"Number of profiles to compare: {len(profiles)}")
    all_profiles = [target_profile] + profiles
    encoded_input = tokenizer(all_profiles, padding=True, truncation=True, return_tensors='pt')
    with torch.no_grad():
        model_output = model(**encoded_input)
    embeddings = mean_pooling(model_output, encoded_input['attention_mask'])
    embeddings = F.normalize(embeddings, p=2, dim=1)
    target_embedding = embeddings[0]
    other_embeddings = embeddings[1:]
    similarities = F.cosine_similarity(target_embedding.unsqueeze(0), other_embeddings, dim=1).tolist()
    
    print(f"Similarity scores computed: {len(similarities)} scores")
    sorted_indices = sorted(range(len(similarities)), key=lambda i: similarities[i], reverse=True)
    top_results = [{"id": ids[i], "similarity": similarities[i]} for i in sorted_indices[:top_n]]
    print(f"Top {top_n} results: {top_results}")
    return top_results

def build_investor_profile(investor):
    prefs = investor.get("investmentPreferences", {})
    desc = investor.get("businessPlan", {}).get("description", "")
    profile = f"{desc} Industry: {prefs.get('industry', '')}, Funding: {prefs.get('fundingAmount', '')}, Risk: {prefs.get('riskLevel', '')}"
    print(f"Built investor profile: {profile[:50]}...")  # Truncate for readability
    return profile

def build_startup_profile(startup):
    bp = startup.get("businessPlan", {})
    desc = bp.get("description", "")
    profile = f"{desc} Model: {bp.get('businessModel', '')}, Market: {bp.get('marketPotential', '')}, Financials: {bp.get('financialHealth', '')}"
    print(f"Built startup profile: {profile[:50]}...")  # Truncate for readability
    return profile

@app.route('/match', methods=['POST'])
def match():
    print("Received POST request at /match")
    print(f"Request data: {request.json}")
    try:
        data = request.json
        startup_id = data.get('startup_id')
        investor_id = data.get('investor_id')

        if not startup_id and not investor_id:
            print("Error: No startup_id or investor_id provided")
            return jsonify({"error": "Please provide either a startup_id or an investor_id."}), 400

        if startup_id:
            print(f"Matching for startup_id: {startup_id}")
            startups_data = fetch_data(STARTUPS_API_URL)
            startup = next((s for s in startups_data if s.get("_id") == startup_id), None)
            if not startup:
                print(f"Startup not found for ID: {startup_id}")
                return jsonify({"error": "Startup not found"}), 404
            startup_profile = build_startup_profile(startup)
            print(f"Startup profile: {startup_profile}")
            
            investors_data = fetch_data(INVESTORS_API_URL)
            investor_profiles = [build_investor_profile(inv) for inv in investors_data]
            investor_ids = [inv.get("_id") for inv in investors_data]
            investor_details = {inv["_id"]: inv for inv in investors_data}
            top_investors = compute_similarity(startup_profile, investor_profiles, investor_ids)
            
            result = {
                "startup": {"_id": startup_id, "profile": startup_profile},
                "potential_investors": [
                    {**investor_details[inv["id"]], "similarity": inv["similarity"]} 
                    for inv in top_investors
                ]
            }
            print(f"Match result for startup: {result}")
            return jsonify(result)

        elif investor_id:
            print(f"Matching for investor_id: {investor_id}")
            investors_data = fetch_data(INVESTORS_API_URL)
            investor = next((inv for inv in investors_data if inv.get("_id") == investor_id), None)
            if not investor:
                print(f"Investor not found for ID: {investor_id}")
                return jsonify({"error": "Investor not found"}), 404
            investor_profile = build_investor_profile(investor)
            print(f"Investor profile: {investor_profile}")
            
            startups_data = fetch_data(STARTUPS_API_URL)
            startup_profiles = [build_startup_profile(s) for s in startups_data]
            startup_ids = [s.get("_id") for s in startups_data]
            startup_details = {s["_id"]: s for s in startups_data}
            top_startups = compute_similarity(investor_profile, startup_profiles, startup_ids)
            
            result = {
                "investor": {"_id": investor_id, "profile": investor_profile},
                "potential_startups": [
                    {**startup_details[st["id"]], "similarity": st["similarity"]} 
                    for st in top_startups
                ]
            }
            print(f"Match result for investor: {result}")
            return jsonify(result)

    except Exception as e:
        print(f"Error occurred: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print(f"Starting Flask server on port {PORT}")
    app.run(host="0.0.0.0", port=int(PORT), debug=True)