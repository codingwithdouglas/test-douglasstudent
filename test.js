const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Read the HTML file
const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

// Create a JSDOM instance
const dom = new JSDOM(html, { runScripts: "dangerously" });
const { window } = dom;
const { document } = window;

global.window = window;
global.document = document;

describe('Hello World Project', () => {
    beforeAll(() => {
        // Load the script into the JSDOM instance
        const scriptContent = fs.readFileSync(path.resolve(__dirname, './index.js'), 'utf8');
        const scriptEl = document.createElement('script');
        scriptEl.textContent = scriptContent;
        document.body.appendChild(scriptEl);
    });

    test('h1 contains Hello World text', () => {
        const h1 = document.querySelector('h1');
        expect(h1).not.toBeNull();
        expect(h1.textContent).toBe('Hello World');
    });

    test('button click displays alert', () => {
        const button = document.querySelector('#greetButton');
        window.alert = jest.fn();
        button.click();
        expect(window.alert).toHaveBeenCalledWith('Hello, World!');
    });
});
