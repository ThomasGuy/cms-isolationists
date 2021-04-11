import { MdWeekend as icon } from 'react-icons/md';

export default {
  // Computer name
  name: 'subject',
  //  visible name
  title: 'Subject',
  icon,
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Subject',
      type: 'string',
      description: 'This weeks subject',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'week',
      title: 'Week',
      type: 'number',
      decription: 'This weeks number',
      validation: Rule => Rule.required().min(1),
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      hidden: true,
    },
    // {
    //   name: 'Pictures',
    //   title: 'Pictures',
    //   type: 'array',
    //   of: [{ type: 'reference', to: [{ type: 'picture' }] }],
    // },
  ],
  orderings: [
    {
      title: 'Week newest',
      name: 'week',
      by: [{ field: 'week', direction: 'desc' }],
    },
    {
      title: 'Week oldest',
      name: 'week',
      by: [{ field: 'week', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      week: 'week',
    },
    prepare({ title, week }) {
      return {
        title: `${week}. ${title}`,
      };
    },
  },
};

// of: [{ type: 'reference', to: [{ type: 'picture' }] }]
