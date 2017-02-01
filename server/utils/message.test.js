const expect = require('expect');

let {generateMessage, generateLocationMessage} = require('./message')

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        let from = 'Jen';
        let text = 'Some message';
        let message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});
    });
});


describe('generateLocationMessage', () => {
    it('should generate correct location message object', () => {
        let from = 'Jen';
        let lat = '10';
        let lon = '11';
        let url = 'https://www.google.com/maps?q=10,11';
        let message = generateLocationMessage(from, lat, lon);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, url});
    });
});