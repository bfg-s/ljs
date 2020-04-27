# Usage LJS Comader

## Execute modes

### Mode "exec"
```javascript
/**
 * Method for one or multiple call.
 * 
 * @param data {string|Array|Object} executed data
 * @param params {array|any} executed params for one call
 * @param storage_data {Object} Executor storage (this.storage)
 * @returns {null}
 */
ljs.exec(data, params = null, storage_data = {});

/**
 * Execute helper.
 * 
 * @param command {string|Array|Object} executed data
 * @param params {any} executed params for one call
 * @returns {*}
 */
exec(command, ...params);

/**
 * String Prototypes
 */
"toast:error".exec('Error message');
"toast:error".exec('Error message', 'Error');

//Send param to executor
"message".to('toast:success');

/**
 * Array Prototypes
 */
//Map executors for params
["toast::success","console.log"].exec('New message');
["toast::success","console.log"].exec('message text', 'New message');

//To map. Each element of the array as a new parameter for the next call.
["You have 5 new followers","New message from user"].tom('toast:success');
[["5 new", "Followers"],["message text","Message"]].tom('toast:success');

//Parameters to pass to the function.
["message", "title"].to('toast:success'); 
//same 
[["message", "title"]].tom('toast:success');
```

#### Examples

##### One execute
```javascript
ljs.exec('toast::success', 'User successful auth!');
ljs.exec('toast::success', ['Success auth!', 'User']);
// or
exec('toast::success', 'User success auth!');
exec('toast::success', 'Success auth!', 'User');
```
##### Multiple execute
```javascript
ljs.exec({
    'toast::success': 'User successful auth!',
    'toast::warning': ['Needle enter a profile data!', 'Profile']
});
// or
exec({...})
```

### Mode "call" single string line
```javascript
/**
 * Call mode
 * 
 * @param command {string} executed data
 * @param storage
 * @returns {undefined|*}
 */
ljs.call(command, storage = {});

/**
 * Call helper
 * 
 * @param command {string} executed data
 * @param storage
 * @returns {*}
 */
call(command, storage = {});

/**
 * String Prototypes
 */
"toast:success(Success auth)".call();

/**
 * Array Prototypes
 */
["toast:success(Success auth)", "toast:warning(Enter a phone number, Profile)"].call()
```

Call single line syntax:
```
toast:error(Some error text, Error title, {"progressBar": true})
// or
location.pathname
```
In brackets is the body for the parameters. Separate parameters with commas, be careful not to use the `,` symbol in the parameters only if you need to add the following parameter.

#### Examples

```javascript
ljs.call("toast:success(Success auth)");
// or 
call("toast:success(Success auth)");
```

### Mode "parse" single string line

```javascript
/**
 * String parse
 *
 * @param str
 * @param storage
 * @returns {*}
 */
ljs.parse(str, storage = {});

/**
 * String Prototypes
 */
"My location is >>location.href".parse();

/**
 * Array Prototypes
 */
["toast:success(Success auth)", "toast:warning(Enter a phone number, Profile)"].call()
```
To indicate a call to a string format function, you must specify the input character `>>` before calling it.

# Executor extends
1 - Create you js executor file 'resources/js/executors/Root.js' 
```javascript
'use strict';

class Root extends Executor {

    /**
     * For call without method.
     * (don't required)
     * 
     * @param text
     * @public
     */
    __invoke (text = "My executor") {
        
        //this.storage - Executor storage

        text.exec('toast:success');
        
        return text;
    }
    
    /**
     * Magic method "How PHP".
     * (don't required)
     * 
     * @param $name
     * @param $arguments
     * @public
     */
    __call ($name, $arguments) {
        //
    }

    /**
     * Class name for call.
     * If don't set, name becomes equal to class name.
     * (don't required)
     *
     * @returns {null|string}
     * @private
     */
    static __name () {

        return "root";
    }

    /**
     * Array of aliases from object.
     * (don't required)
     *
     * @returns {{}}
     */
    static __aliases () {

        return [];
    }

    /**
     * Individual method name getter.
     * (don't required)
     *
     * @returns {string}
     * @private
     */
    static __individual_method () {

        return "__invoke";
    }
}

module.exports = Message;
```
2 - Inject extend in LJS
```javascript
ljs.regExec(require('./executors/Root'));
```

3 - Call a new extension
```javascript
call('root');
call('root', 'I Love Shaurma');
"I created >>root".parse();
```

# Pipelines
1. `&&` - Send globally passed parameters to the next call.
2. `&` - Send undefined to the next call.
3. `#`  - Send null to the next call.
4. `*` - Send the results of the previous execution to the next call.
5. `>` - Send global parameters along with previous results.
6. `[0-9]>` - Send the result number from the beginning of the line.
7. `[0-9]>>` - Send the result number from the end of the line.

### Example
```javascript
"location.origin & location.pathname > toast".exec();
// or
"document.title > confirm".exec();
```

# Default LJS Executors

## Alert system

Extend documentation https://github.com/CodeSeven/toastr

```
errors [msg, msg,...]
message [msg]
```

Show success message:
```
toast:success [message]
toast:success [message, title = null, options = {}]
toast:success [{'text': 'message text', 'title': 'message title', 'options': {}}]
//or
toast::success //public method
```
Show error message:
```
toast:error [message]
toast:error [message, title = null, options = {}]
toast:error [{'text': 'message text', 'title': 'message title', 'options': {}}]
//or
toast::error //public method
```
Show info message:
```
toast:info [message]
toast:info [message, title = null, options = {}]
toast:info [{'text': 'message text', 'title': 'message title', 'options': {}}]
//or
toast::info //public method
```
Show warning message:
```
toast:warning [message]
toast:warning [message, title = null, options = {}]
toast:warning [{'text': 'message text', 'title': 'message title', 'options': {}}]
//or
toast::warning //public method
```
Show toast message:
```
toast [message]
toast [message, title = null, options = {}, type = "info"]
toast [{'text': 'message text', 'title': 'message title', 'options': {}}]
```

##### Examples
```javascript
ljs.exec('errors', ['error1', 'error2']);
ljs.exec('message', 'message text');
ljs.exec('toast:success', 'success static message');
ljs.exec('toast::success', 'success message');
ljs.exec('toast::success', ['message', 'title', {'progressBar': true}]);
ljs.exec('toast::success', {'text': 'message', 'title': 'title', 'options': {'progressBar': true}});
```

## Document

#### Public methods
LJS Event dispatch:
```
doc::dispatch_event [event]
```
Set document title
```
doc::title [title]
```
Set document location:
```
doc::location [location]
doc::set_location [location]
```
Reload document:
```
doc::reload [null]
```

## JQuery decorator
Equivalent to `$('$element').show()`
```
jq::show [$element]
```

Equivalent to `$('$element').hide()`
```
jq::hide [$element]
```

Equivalent to `$('$element').html($data)`
```
jq::html [$element, $data = '']
```

Equivalent to `$('$element').replaceWith($data)`
```
jq::replace [$element, $data = '']
```

Equivalent to `$('$element').append($data)`
```
jq::append [$element, $data = '']
```

Equivalent to `$('$element').submit()`
```
jq::submit [$element]
```
Set attributes
```
jq::attribute [$element, $attribute_name, $attribute_value]
jq::attribute [$element, {'attribute_name': 'attribute_value',...}]

//Or on with element
jq::attribute [$attribute_name, $attribute_value]
jq::attribute [{'attribute_name': 'attribute_value',...}]
```

Global eval:
```
jq::eval [data]
jq::globalEval [data]
```

## Alert Swal

Alert success
```
swal::success [text]
swal::success [title, text]
alert::success [text]
alert::success [title, text]
```

Alert warning
```
swal::warning [text]
swal::warning [title, text]
alert::warning [text]
alert::warning [title, text]
```

Alert error
```
swal::error [text]
swal::error [title, text]
alert::error [text]
alert::error [title, text]
```

Alert info
```
swal [text]
swal [title, text]
alert [text]
alert [title, text]
swal::info [text]
swal::info [title, text]
alert::info [text]
alert::info [title, text]
```

Alert question
```
swal::question [text]
swal::question [title, text]
alert::question [text]
alert::question [title, text]
```

## Timer
Create timeout timer
```
timer::out {1000: ExecutedData, 2000: ExecutedData,...}
1000 - ms
2000 - ms
```
Create timer interval
```
timer::interval [name, ExecutedData, ms = 1000]
```
Clear timer interval
```
timer::clear [name]
```

##### Examples
```javascript
//Create interval in 2 second and clear him by timeout 6 sec
ljs.exec({
    'timer::interval': [
        'my_timer', {'toast::success': 'Timer tik!'}, 2000
    ], 
    'timer::out': {
        6000: {'timer::clear': 'my_timer'}
    }
});
```

## Global variables
Set variable
```
var::set [path, value, save = false]
```
Merge global variables
```
var::merge [{path: value,...}, save = false]
```
Set and save variable (save on localstorage)
```
var::save [path, value]
```
Only forgot variable (delete from localstorage)
```
var::forgot [path, value]
```
Unset variable
```
var::unset [path]
```
Get variable
```
var::get [path = null]
```
Get variable names (keys)
```
var::keys [null]
```
