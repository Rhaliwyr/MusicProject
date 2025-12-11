const fs = require('fs');
const path = 'src/App.css';

try {
    let content = fs.readFileSync(path, 'utf8');
    const lines = content.split('\n');

    // The corrupted block starts around line 715 (0-indexed: 714)
    // We want to replace the block starting with .easy-char { ... } which has the modal styles

    let newLines = [];
    let skipping = false;
    let replaced = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.trim() === '.easy-char {' && lines[i + 1] && lines[i + 1].includes('padding: 3rem;')) {
            skipping = true;
            // Insert correct style
            newLines.push('.easy-char {');
            newLines.push('    border-bottom: 2px solid #666;');
            newLines.push('    min-width: 20px;');
            newLines.push('    text-align: center;');
            newLines.push('    padding: 0 0.2rem;');
            newLines.push('    font-size: 1.5rem;');
            newLines.push('}');
            replaced = true;
        }

        if (skipping && line.trim() === '}') {
            skipping = false;
            continue; // Don't add the closing brace of the bad block
        }

        if (!skipping) {
            newLines.push(line);
        }
    }

    if (replaced) {
        fs.writeFileSync(path, newLines.join('\n'));
        console.log('Successfully fixed App.css');
    } else {
        console.log('Could not find the corrupted block to replace.');
    }

} catch (err) {
    console.error('Error:', err);
}
