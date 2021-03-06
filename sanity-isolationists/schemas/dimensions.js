import { BiRuler as icon } from 'react-icons/bi';

export default {
  // Computer name
  name: 'dimensions',
  //  visible name
  title: 'Dimensions',
  icon,
  type: 'object',
  fields: [
    {
      name: 'width',
      title: 'Width cm',
      type: 'number',
      validation: Rule => Rule.required(),
    },
    {
      name: 'height',
      title: 'Height',
      type: 'number',
      validation: Rule => Rule.required(),
    },
  ],
};
