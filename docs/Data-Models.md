CEDDL does not contain a fixed set of data structures. why?, Busines and application requirements for customer experience data can be verry different. Naming is communication. Bad names and structure prevent data from clearly communicating its intent. Instead a author can define the data structure that is applicable to the application.

It is like setting up a database with tables, column names and column types inside the client. With this information the datalayer can help teams during developement and improve data quality overall. The ability to catch data issue's before they end up on a live server can be invaluable. The inspiration for the validation came from [html52] Client-side form validation.

This section covers some of the key concepts for defining the structure of data in the datalayer. Building a properly structured database requires quite a bit of forethought. Plan for how data is going to be used later if possible.

Consider, for example, a user logging in to a website. let's make a user definition together that accomidates a type and is assigned to multiple usergroups.

### The Root Model
To start our user needs a "username", "id" and "type". It will be manditory to fill these fields (required: true).

Note, we define user as a root object. This means that the datalayer will be looking for this data structure in the HTML of the webpage.

```js
CEDDL.ModelFactory.create({
    key: 'user', // name of the object
    root: true, // Is the basis / root of a data structure
    fields: {
        username: {
            type: CEDDL.ModelFactory.fields.String,
            required: true,
        },
        id: {
            type: CEDDL.ModelFactory.fields.Number,
            required: true,
        },
        type: {
            type: CEDDL.ModelFactory.fields.String,
            pattern: '^(business|consumer)$',
            required: true,
        }
    }
});
```


### Define Relations

We could technically add longitude, latitude, country, state/province to the user directly. Location feels like a separate logical data grouping that could be reused someware else. With that in mind lets define a location as a separate model.

```js
CEDDL.ModelFactory.create({
    key: 'location',
    fields: {
        longitude: {
            type: CEDDL.ModelFactory.fields.Number,
            required: false,
        },
        latitude: {
            type: CEDDL.ModelFactory.fields.Number,
            required: false,
        },
        country: {
            type: CEDDL.ModelFactory.fields.String,
            required: true,
        },
        stateProvince: {
            type: CEDDL.ModelFactory.fields.String,
            required: false,
        }
    }
});
```
Next step is to connect the user and location by adding a relation to the user. The user model will now look like:

```js
CEDDL.ModelFactory.create({
    key: 'user', // name of the object
    root: true, // Is the basis / root of a data structure
    fields: {
        username: {
            type: CEDDL.ModelFactory.fields.String,
            required: true,
        },
        id: {
            type: CEDDL.ModelFactory.fields.Number,
            required: true,
        },
        type: {
            type: CEDDL.ModelFactory.fields.String,
            pattern: '^(business|consumer)$',
            required: true,
        },
        location: {
            type: CEDDL.ModelFactory.fields.Model, // Note the ModelField type here
            foreignModel: 'location', // Reference to the key of the sub model
            required: false,
        }
    }
});
```

### Define Lists

Next challange is the user groups. There can be multiple for a single user and they will consist of id, type.

```js
CEDDL.ModelFactory.create({
    key: 'usergroup',
    fields: {
        id: {
            type: CEDDL.ModelFactory.fields.NumberField,
            required: true,
        },
        type: {
            type: CEDDL.ModelFactory.fields.StringField,
            required: true,
        }
    }
});
```

Next step is to add a list of usergroup to the user. We will assign the list to a different name (group_list) as it comunicates the content more clearly. The user model will now look like:

```js
CEDDL.ModelFactory.create({
    key: 'user',
    root: true, // Is the basis / root of a data structure
    fields: {
        username: {
            type: CEDDL.ModelFactory.fields.StringField,
            required: true,
        },
        id: {
            type: CEDDL.ModelFactory.fields.NumberField,
            required: true,
        },
        type: {
            type: CEDDL.ModelFactory.fields.String,
            pattern: 'business|consumer',
            required: true,
        },
        location: {
            type: CEDDL.ModelFactory.fields.Model,
            foreignModel: 'location',
            required: false,
        },
        usergroups: {
            type: CEDDL.ModelFactory.fields.List, // Note the ListField type here
            foreignModel: 'usergroup', // Reference to the key of the sub model
            required: true,
        }
    }
});
```

### Results

Filling the modal yields the following JSON result:
```json
{
    "user": {
        "username": "Frank Huntelaar",
        "id": 1321465479,
        "location": {
            "longitude": 36.204824,
            "latitude": 138.252924,
            "country": "Japan",
             stateProvince: "tokyo"
        },
        "usergroups": [
            {
                "id": 51231,
                "type": "dashboarding"
            },
            {
                "id": 11233,
                "type": "default"
            }
        ]
    }
}
```



### Extending Existing Modals

In the admin part of the website the author would like to track if the administrator is allowed to create new users and if they have completed the training. To allow for this we would like to have manditory fields inside the admin part of the website without changing the normal user model. To achieve this we will create a new model extending the user we created above.

```js
CEDDL.ModelFactory.create({
    key: 'admin_user',
    extends: 'user', // we are extending the user model here!
    root: true,
    fields: {
        trainingComplete: {
            type: CEDDL.ModelFactory.fields.BooleanField, // Note BooleanField
            required: true,
        },
        userCreateAuthorization: {
            type: CEDDL.ModelFactory.fields.BooleanField,
            required: true,
        }
    }
});
```

<div class="text-right">
<a style="display: inline-block; margin-bottom: 20px; line-height:20px;" href="/html-interface">HTML Interface <i class="icon-arrow-right"></i></a>
</div>








