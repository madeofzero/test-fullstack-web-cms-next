import type { CollectionConfig } from 'payload'

export const Quizzes: CollectionConfig = {
  slug: 'quizzes',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'questions',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'id',
          type: 'number',
          required: true,
        },
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'options',
          type: 'array',
          required: true,
          minRows: 2,
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'score',
              type: 'number',
              required: true,
              min: 0,
              max: 3,
            },
          ],
        },
      ],
    },
    {
      name: 'results',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'minScore',
          type: 'number',
          required: true,
          min: 0,
        },
        {
          name: 'maxScore',
          type: 'number',
          required: true,
          min: 0,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
