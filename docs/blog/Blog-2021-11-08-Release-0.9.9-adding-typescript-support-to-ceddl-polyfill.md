Today, we’re excited to announce TypeScript support for ceddl polyfill via release 0.9.9. Also in this update, increasing downloads require us to get a better understanding of our users.

<p><img src="/img/ceddlandts.png" alt="ceddl and typescript"></p>

To get started using the TypeScript with ceddl-polyfill checkout the updated [ceddl-with-angular](https://github.com/ceddl/ceddl-with-angular) demo

If the types do not work out of the box the Types for this polyfill can be installed trough the @types npm namespace, which hosts TypeScript type definitions from the DefinitelyTyped project. .

```shell
npm install --save @types/ceddl__ceddl-polyfill
```

Minimal Typescript example:
```
import { ceddl, ModelConfig } from '@ceddl/ceddl-polyfill';

const PageModelConfig: ModelConfig = {
    key: 'page',
    root: 'true',
    fields: {
            section: {
                type: ceddl.modelFactory.fields.StringField,
                required: true
            }
        }
    }
};

ceddl.modelFactory.create(PageModelConfig);
ceddl.initialize();
```

### Who are you and what do you do?

With the number of downloads increasing we would like to get a better understanding of our user group. Here are a few questions that will tee us up for a good conversation:

- Can you tell me about your project in a few sentences?
- How did you hear about this polyfill? What specifically interests you about it?
- What environment are you using ceddl-polyfill in and what does your technology stack look like.
- How large is your team?
- Are you talking to others about this project? Wat would you prefer as a communication channel?
- Anything else that we should know about?

Thanks! ceddl working group.

[Provide Feedback now](https://github.com/ceddl/ceddl-website-and-spec/issues/new?assignees=&labels=question&template=feedback.md&title=)