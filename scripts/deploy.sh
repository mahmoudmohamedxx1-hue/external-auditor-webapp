#!/bin/bash

# Egyptian Audit Solution - Deployment Script
# This script helps deploy the application to various platforms

set -e

echo "🚀 Egyptian Audit Solution - Deployment Script"
echo "=============================================="

# Check if environment variables are set
check_env_vars() {
    echo "📋 Checking environment variables..."
    
    if [ -z "$XAI_API_KEY" ]; then
        echo "❌ XAI_API_KEY is not set"
        echo "Please set your xAI API key: export XAI_API_KEY=your_key_here"
        exit 1
    fi
    
    echo "✅ Environment variables are set"
}

# Build the application
build_app() {
    echo "🔨 Building application..."
    
    npm install
    npm run build
    
    echo "✅ Build completed successfully"
}

# Deploy to Netlify
deploy_netlify() {
    echo "🌐 Deploying to Netlify..."
    
    if ! command -v netlify &> /dev/null; then
        echo "Installing Netlify CLI..."
        npm install -g netlify-cli
    fi
    
    netlify deploy --prod --dir=.next
    
    echo "✅ Deployed to Netlify successfully"
}

# Deploy to Railway
deploy_railway() {
    echo "🚂 Deploying to Railway..."
    
    if ! command -v railway &> /dev/null; then
        echo "Installing Railway CLI..."
        npm install -g @railway/cli
    fi
    
    railway login
    railway deploy
    
    echo "✅ Deployed to Railway successfully"
}

# Main deployment function
main() {
    echo "Select deployment platform:"
    echo "1) Netlify"
    echo "2) Railway"
    echo "3) Build only"
    
    read -p "Enter your choice (1-3): " choice
    
    check_env_vars
    build_app
    
    case $choice in
        1)
            deploy_netlify
            ;;
        2)
            deploy_railway
            ;;
        3)
            echo "✅ Build completed. Ready for manual deployment."
            ;;
        *)
            echo "❌ Invalid choice"
            exit 1
            ;;
    esac
    
    echo ""
    echo "🎉 Deployment completed successfully!"
    echo "Your Egyptian Audit Solution is now live!"
}

# Run main function
main "$@"
