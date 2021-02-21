## 02

-   Vue `<style scoped>` = scoped to the Vue components and its children only. Otherwise, the style is available across the entire app.

## 03

### Data Binding:

-   `v-bind`
    Ex. `<a v-bind:href="link"></a>`
-   `:` = shortcut
    Ex. `<a :href="link"></a>`

### Interpolation:

1.  `{{ VALUE }}`
2.  `v-text="model"`

-   Case matters

### Event Binding

1. `v-on:event="method-name"`
2. `@` = `v-on`
   Ex. `@click="method-name"`

-   For event functions, can omit `()` if no parameters are being passed.

### Two-way Binding

-   Uses `v-model`.

### Checkbox, Radio Button, and Style Bindings

-   `:style` = inline Vue styling

### Select & Class Bindings

-   Key Binding

    -   Syntax: `@keyup.ecs="<function>"`
    -   When the escape key is pressed and release, execute function

-   Class Binding
    Ex. `:class="{ invalid: !true }"
    -   Syntax: `{ <class>: <data property> }`

## 04

### Rendering Lists

-   `v-for="item in list"`
-   `:key` binding for unique items allows for fasting rendering

    -   Syntax: `<li v-for="item in array" :key="item.id">`

-   Good practice to instantiate data as "undefined" and use conditionals to prevent rendering errors.

-   `v-if=` = conditionally add/remove content from DOM.

### Show/Hiding:

-   `v-show="<expression>"` = doesn't remove from the DOM.
-   Uses `display: none;`
-   Truthy/falsy value

## 05

### Data Model:

```
data() {
    return {
        prop1: [],
        prop2: undefined,
        prop3: "",
    }
}
```

### Computed Properties:

-   Fired only when a _dependency_ value changes.

```
computed: {
    fullName() {
        return `${this.firstName} ${this.lastName}`
    }
}
```

-   Can use getters/setters:

```
computed: {
    fullName: {
        get() {
            let value = this.firstName
        },
        set(value) {

        }
    },

}
```

### Lifecycle Hooks

-   After `Vue()` instance is created,
    -   `beforeCreate()` then `created()` are run; the DOM is not available.
        -   Good for API calls
        -   `created` = invoked when the component is created.
            -   Frequently used to fetch data for component.
            -   Template/virtual DOM are not yet mounted/rendered
    -   `beforeMounted()` then `mounted()`
        -   DOM is then available
        -   Good for 3rd party components
    -   When data changes, `beforeUpdate()` and `updated()` are available.
    -   When a component goes away, `beforeDestroy()` and `destroyed()`.

### Watched Properties

-   Watchers = reacts to data changes.
    -   Named same as reactive value.
    -   Accepts new and old values
    -   Ideal for async operations.
    -   Call customs logic.

```
watch: {
    namedValue(newValue, oldValue) {
        // execute logic.
    }
}
```

-   If watching nested object properties, use quotes (" " | ' ') to defined object path using dot notation.

-   Options:
    -   `immediate: <true | false>`
    -   Requires a handler.
    -   `deep: <true | false>` watches nested properties.

```
watch: {
    "object.property": {
        immediate: true,
        handler(newValue, oldValue) {
            // execute logic
        }
    }
}
```

### Filters

-   Defined in a component
-   Custom function that accept a value that is bound in the template

    Ex. `{{ firstName | capitalize }}`

-   Filters can be chained

    Ex. `{{ firstName | capitalize | reverse }}`

-   Global Filters:

    -   Define once, use everywhere
    -   Must come before the `Vue` instance

    Ex. In `app.vue`:

    ```
    import Vue from 'vue';

    Vue.filter('capitalize', function(value) {
        if (!value) return '';
        value = value.toString();
        return value.charAt(0).toUpperCase() + value.slice(1);
    });
    ```

## 06

-   To include other components (i.e. parent-child), they need to be declared in the parent component:

```
export default {
    name: "Parent",
    data() { },
    components: { Child1, Child2, Child3 }
}
```

### Passing Props

-   In the parent component:
    `:prop="data"`
-   In the child component:

```
export default {
    props: {
        prop: {
            type: <Object|Array|String|Integer|Boolean|Function|Promise>,
            default: () => {},
        },
    },
}
```

**NOTE**: camelCased props names (child) user kebab-cased in templates (parent)

-   Can use dynamic or static values.

    -   Dynamic: `:` (or `v-bind`) required because it maps to a model
        `:name="person.name"`
    -   Static: No `:`
        `name="Terrence"`

-   Child prop designations can have a `default`, `required`, or `validator` operators.

-   Use ` vprop` snippet.

### Passing Objects

-   Do not mutate props. Instead clone ("shallow clone") to child `data()` state.
    -   Other libraries (such as lodash) can help with larger objects.

### Child to Parent Communication

-   The child component "emits" the event and the parent "listens" for the event.

    -   Child: `this.$emit("event", this.data);`
    -   Parent: `<ChildComponent @event="saveData">`

    Ex. Child:

    ```
    methods: {
        savePerson() {
            this.$emit("save", this.person); // "this.person" is the cloned data.
        }
    }
    ```

    Ex. Parent:

    ```
    <ChildComponent

        // the original data prop passed to the child
        :person="selectedPerson"

        // parent is listening for an event called "save" and will execute its own custom method called "savePerson."
        @save="savePerson"

    >
    ```

### Mixins

-   Allow sharing parts (methods, computed, data, watches, life cycle hooks, etc.) of components to other components.

-   In the component that is to use shared functionality, `import { component } from 'directory'` and then declare:

    ```
    export default {
        // ...
        mixins: [component],
        // ...
    }
    ```

-   Conflict Notes:

    -   Methods, Components, and Computeds:

        -   Merged
        -   Precedence is given to the _component's_ method first, then the mixins.

    -   Data

        -   Merged superset.
        -   Precedence is given to _component's_ data.

    -   Watch and Hooks

        -   Both (mixin and component) run.
        -   Mixins **BEFORE** component.

-   Tips:
    1. Create small components
    2. Communicate DOWN with props.
    3. Communicate UP with events.

## 07
