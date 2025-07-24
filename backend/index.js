
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/save-html', (req, res) => {
    const data = req.body;
    const filename = `${data.fullName.replace(/\s+/g, '_')}_response.html`;
    const htmlContent = `
      <html><body><h1>Retirement Plan Summary</h1>
      <p><strong>Full Name:</strong> ${data.fullName}</p>
      <p><strong>DOB:</strong> ${data.dob}</p>
      <p><strong>Marital Status:</strong> ${data.maritalStatus}</p>
      <p><strong>Occupation:</strong> ${data.occupation}</p>
      <p><strong>Annual Income:</strong> ${data.income}</p>
      <p><strong>Dependents:</strong> ${data.dependents}</p>
      <p><strong>Assets:</strong> ${data.assets}</p>
      <p><strong>Liabilities:</strong> ${data.liabilities}</p>
      </body></html>`;

    fs.writeFileSync(path.join(__dirname, filename), htmlContent);
    res.json({ message: `Response saved as ${filename}` });
});

app.listen(3000, () => console.log('Server running on port 3000'));
