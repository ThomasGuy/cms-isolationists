/* eslint-disable import/no-unresolved */
// First, we must import the schema creator
// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';
import createSchema from 'part:@sanity/base/schema-creator';
import artist from './artist';
import picture from './picture';
import subject from './subject';
import link from './link';
import social from './social';
import dimensions from './dimensions';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([artist, subject, picture, link, social, dimensions]),
});
