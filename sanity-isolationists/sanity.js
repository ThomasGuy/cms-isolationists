import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'ukbaygfd',
  dataset: 'production',
  useCdn: true,
})

export default client;
