from flask import Flask, request, jsonify, render_template
from vector_database import (
    get_policy_response,
    simplify_contract,
    check_content_safety,
    generate_invoice,
    ask_rohit
)
from flask_cors import CORS
import asyncio
import re

app = Flask(__name__, static_folder="static", template_folder="templates")
CORS(app)


@app.route("/")
def index():
    return render_template("advisor.html")


@app.route("/api/contract/simplify", methods=["POST"])
async def simplify():
    try:
        data = await asyncio.to_thread(request.get_json)
        text = data.get("text", "")
        if not text:
            return jsonify({"error": "Contract text missing"})

        summary = await asyncio.to_thread(simplify_contract, text)

        # Remove Groq's <think>...</think> if present
        summary = re.sub(r"<think>.*?</think>", "", summary, flags=re.DOTALL).strip()

        return jsonify({"summary": summary})
    except Exception as e:
        return jsonify({"error": f"Failed to simplify contract: {str(e)}"}), 500


@app.route("/api/content/check", methods=["POST"])
def content_check():
    try:
        data = request.get_json()
        text = data.get("text", "")
        if not text:
            return jsonify({"error": "Content text missing"})

        report = check_content_safety(text)
        return jsonify({"report": report})
    except Exception as e:
        return jsonify({"error": f"Content check failed: {str(e)}"}), 500


@app.route("/api/invoice/generate", methods=["POST"])
async def invoice():
    try:
        data = await asyncio.to_thread(request.get_json)
        brand = data["brand"]
        service = data["service"]
        amount = float(data["amount"])
        include_gst = data.get("include_gst", False)

        invoice_text = await asyncio.to_thread(generate_invoice, brand, service, amount, include_gst)
        return jsonify({"invoice_text": invoice_text})
    except (KeyError, ValueError) as e:
        return jsonify({"error": f"Invalid input: {str(e)}"}), 400
    except Exception as e:
        return jsonify({"error": f"Invoice generation failed: {str(e)}"}), 500


@app.route("/api/youtube/policy", methods=["POST"])
def youtube_policy():
    data = request.json
    question = data.get("question", "")
    if not question:
        return jsonify({"error": "Question is required"})

    answer = get_policy_response(question)

    # ✅ Clean out <think>...</think> and trim
    import re
    answer = re.sub(r"<think>.*?</think>", "", answer, flags=re.DOTALL).strip()

    return jsonify({"answer": answer})


@app.route("/api/ama/ask", methods=["POST"])
def ama():
    try:
        data = request.get_json()
        question = data.get("question", "")
        if not question:
            return jsonify({"error": "Question is required"})

        answer = ask_rohit(question)
        return jsonify({"answer": answer})
    except Exception as e:
        return jsonify({"error": f"AMA failed: {str(e)}"}), 500


if __name__ == "__main__":
    app.run(debug=True)
