
import fs from 'fs';
console.log('Test script running');
try {
    fs.writeFileSync('test_output.txt', 'Hello from test script');
    console.log('File written successfully');
} catch (e) {
    console.error('Error writing file:', e);
}
