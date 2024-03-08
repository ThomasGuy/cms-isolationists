// sanity.config.js
import { defineConfig } from 'sanity'
import {visionTool} from '@sanity/vision'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schema'

export default defineConfig({

  name: "defalt",
  title:'Isolationists',
  projectId: "ukbaygfd",
  dataset: "production",
  plugins: [
    structureTool(),
    visionTool()
  ],
  schema: {
    types: schemaTypes,
  },

})
