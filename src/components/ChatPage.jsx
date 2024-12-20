import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './ChatPage.css'; // Importing updated styles

// Predefined code snippets with installation instructions
const codeSnippets = {
  dataVisualization: `
### Installation Instructions:
To run this code, you need to install the following Python libraries:

\`\`\`bash
!pip install matplotlib numpy
\`\`\`

### Data Visualization with Matplotlib
\`\`\`python
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 10, 100)
y = np.sin(x)

plt.plot(x, y)
plt.title("Sine Wave")
plt.xlabel("X-axis")
plt.ylabel("Y-axis")
plt.grid(True)
plt.show()
\`\`\`
`,
  machineLearning: `
### Installation Instructions:
To run this code, you need to install the following Python libraries:

\`\`\`bash
!pip install scikit-learn
\`\`\`

### Machine Learning with Scikit-Learn
\`\`\`python
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Load dataset
data = load_iris()
X = data.data
y = data.target

# Split the dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3)

# Train a classifier
clf = RandomForestClassifier()
clf.fit(X_train, y_train)

# Predictions and accuracy
y_pred = clf.predict(X_test)
print("Accuracy:", accuracy_score(y_test, y_pred))
\`\`\`
`,
  education: `
### Installation Instructions:
To run this code, you need to install the following Python library:

\`\`\`bash
!pip install numpy
\`\`\`

### Education with Python
\`\`\`python
# Simple Python code for calculating the factorial of a number
def factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n - 1)

num = 5
print(f"The factorial of {num} is {factorial(num)}")
\`\`\`
`
};

function ChatPage() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [response, setResponse] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false); // New state for typing simulation

  const handleSendMessage = () => {
    if (!message) return;
    
    // Add user message to chat history
    const userMessage = {
      sender: 'user',
      text: message,
    };
    setChatHistory([...chatHistory, userMessage]);

    // Start typing animation
    setIsBotTyping(true);

    // Get predefined code snippet based on the user input
    let botResponse = '';
    if (message.toLowerCase().includes('data visualization')) {
      botResponse = codeSnippets.dataVisualization;
    } else if (message.toLowerCase().includes('machine learning')) {
      botResponse = codeSnippets.machineLearning;
    } else if (message.toLowerCase().includes('education')) {
      botResponse = codeSnippets.education;
    } else {
      botResponse = 'Sorry, I don’t understand your request. Please ask about Data Visualization, Machine Learning, or Education.';
    }

    // Simulate typing effect by showing text one by one
    simulateBotResponse(botResponse);
    setMessage('');
  };

  // Simulate the bot typing with a delay for each character
  const simulateBotResponse = (botResponse) => {
    let i = 0;
    let botText = ''; // Initialize an empty string to hold the response text
    const interval = setInterval(() => {
      botText += botResponse[i]; // Add the next character
      setResponse(botText); // Update the state with the new text

      i++;
      if (i >= botResponse.length) {
        clearInterval(interval);
        setIsBotTyping(false); // Stop typing animation when done
      }
    }, 50); // Adjust the delay here to control typing speed
  };

  // Copy code to clipboard
  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code)
      .then(() => {
        alert('Code copied to clipboard!');
      })
      .catch((err) => {
        alert('Failed to copy code: ' + err);
      });
  };

  return (
    <div style={{ marginTop: '100px' }} className="chat-page">
      <h2>Ask for Code Snippets</h2>
      <h4>Please ask about Data Visualization, Machine Learning, or Education.</h4>

      <div className="chat-container">
        <div className="chat-input">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask for code (e.g., Data Visualization)"
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>

      {/* Show markdown formatted response */}
      {response && (
        <div className="response">
          <ReactMarkdown children={response} />
          {/* Add the copy button for each snippet */}
          <button
            className="copy-button"
            onClick={() => copyToClipboard(response)}
          >
            Copy Code
          </button>
        </div>
      )}

      {/* Display "AI is typing..." message while bot is typing */}
      {isBotTyping && (
        <div className="typing-indicator">
          <p>AI is typing...</p>
        </div>
      )}
    </div>
  );
}

export default ChatPage;
