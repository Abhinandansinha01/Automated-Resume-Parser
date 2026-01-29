import json
import boto3
import uuid
import os
import io

s3 = boto3.client('s3')
textract = boto3.client('textract')
dynamodb = boto3.resource('dynamodb')

def upload(event, context):
    """
    Handle file upload via API Gateway.
    In a real app, you'd use a presigned URL. 
    Here we mock a direct upload for simplicity.
    """
    try:
        # In production, parse multipart data here
        # For demo, we assume base64 content in body
        file_content = event.get('body')
        file_name = f"{uuid.uuid4()}.pdf"
        bucket_name = os.environ.get('BUCKET_NAME', 'resume-uploads-dev')
        
        # s3.put_object(Bucket=bucket_name, Key=file_name, Body=file_content)
        
        return {
            "statusCode": 200,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"message": "File uploaded successfully", "file_id": file_name})
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps(str(e))
        }

def process(event, context):
    """
    Triggered by S3 upload. Extract text using Textract and calculate Fit Score.
    """
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = event['Records'][0]['s3']['object']['key']
    
    print(f"Processing file: {key} from {bucket}")
    
    # 1. Extract Text
    # response = textract.analyze_document(
    #     Document={'S3Object': {'Bucket': bucket, 'Name': key}},
    #     FeatureTypes=['TABLES', 'FORMS']
    # )
    
    # Mock extracted text for demonstration
    extracted_text = "Experienced Cloud Engineer with AWS and Python skills."
    
    # 2. Compute Fit Score (Simple Keyword Matching)
    job_keywords = ['AWS', 'Python', 'Terraform', 'React', 'Docker']
    score = calculate_score(extracted_text, job_keywords)
    
    # 3. Save to DynamoDB
    table_name = os.environ.get('TABLE_NAME', 'candidates-dev')
    table = dynamodb.Table(table_name)
    
    item = {
        'id': key,
        'status': 'PROCESSED',
        'fit_score': score,
        'extracted_skills': ['AWS', 'Python'], # Mock
        'timestamp': '2026-01-29T12:00:00Z'
    }
    
    table.put_item(Item=item)
    print(f"Saved candidate {key} with score {score}")

def calculate_score(text, keywords):
    """
    Simple ranking algorithm: (matches / total_keywords) * 100
    """
    text_lower = text.lower()
    matches = sum(1 for k in keywords if k.lower() in text_lower)
    if not keywords: return 0
    return int((matches / len(keywords)) * 100)
