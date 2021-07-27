// Packages
import DatauriParser from 'datauri/parser';

const parser = new DatauriParser();

// Data uri helper function
const dataUri = (buffer, extension) => parser.format(extension, buffer);

export default dataUri;
