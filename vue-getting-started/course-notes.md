## 02

-   Vue `<style scoped>` = scoped to the Vue components and its children only. Otherwise, the style is available across the entire app.

## 03

-   Data Binding:

    -   `v-bind`  
        Ex. `<a v-bind:href="link"></a>`
    -   `:` = shortcut  
        Ex. `<a :href="link"></a>`

-   Interpolation:

    1.  `{{ VALUE }}`
    2.  `v-text="model"`

    -   Case matters

-   Event Binding

    1. `v-on:event="method-name"`
    2. `@` = `v-on`  
       Ex. `@click="method-name"`

    -   For event functions, can omit `()` if no parameters are being passed.

-   Two-way Binding

    -   Uses `v-model`.

-   Checkbox, Radio Button, and Style Bindings

    -   `:style` = inline Vue styling

-   Select & Class Bindings

    -   Key Binding

        -   Syntax: `@keyup.ecs="<function>"`
        -   When the escape key is pressed and release, execute function

    -   Class Binding  
        Ex. `:class="{ invalid: !true }"
        -   Syntax: `{ <class>: <data property> }`

## 04

-   Rendering Lists

    -   `v-for="item in list"`
    -   `:key` binding for unique items allows for fasting rendering
        -   Syntax: `<li v-for="item in array" :key="item.id">`

-   Good practice to instantiate data as "undefined" and use conditionals to prevent rendering errors.

    -   `v-if=` = conditionally add/remove content from DOM.

-   Show/Hiding:

    -   `v-show="<expression>"` = doesn't remove from the DOM.
    -   Uses `display: none;`
    -   Truthy/falsy value

## 05

-   Data Model:

    ```
    data() {
        return {
            prop1: [],
            prop2: undefined,
            prop3: "",
        }
    }
    ```

-   Computed Properties:

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

-   Lifecycle Hooks

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

-   Watched Properties

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

-   Filters

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
