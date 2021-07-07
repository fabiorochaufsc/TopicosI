<a name="cordova.plugins.email"></a>

## cordova.plugins.email : <code>object</code>
**Kind**: global namespace  

* [cordova.plugins.email](#cordova.plugins.email) : <code>object</code>
    * [.aliases](#cordova.plugins.email+aliases)
    * [.getDefaults()](#cordova.plugins.email+getDefaults) ⇒ <code>Object</code>
    * [.isAvailable(callback, scope)](#cordova.plugins.email+isAvailable)
    * [.open(options, callback, scope)](#cordova.plugins.email+open)
    * [.addAlias(alias, packageName)](#cordova.plugins.email+addAlias)
    * [.isServiceAvailable()](#cordova.plugins.email+isServiceAvailable)
    * [.openDraft()](#cordova.plugins.email+openDraft)

<a name="cordova.plugins.email+aliases"></a>

### cordova.plugins.email.aliases
List of all registered mail app aliases.

**Kind**: instance property of <code>[cordova.plugins.email](#cordova.plugins.email)</code>  
<a name="cordova.plugins.email+getDefaults"></a>

### cordova.plugins.email.getDefaults() ⇒ <code>Object</code>
List of all available options with their default value.

**Kind**: instance method of <code>[cordova.plugins.email](#cordova.plugins.email)</code>  
<a name="cordova.plugins.email+isAvailable"></a>

### cordova.plugins.email.isAvailable(callback, scope)
Verifies if sending emails is supported on the device.

**Kind**: instance method of <code>[cordova.plugins.email](#cordova.plugins.email)</code>  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | A callback function to be called with the result |
| scope | <code>Object</code> | The scope of the callback |

<a name="cordova.plugins.email+open"></a>

### cordova.plugins.email.open(options, callback, scope)
Displays the email composer pre-filled with data.

**Kind**: instance method of <code>[cordova.plugins.email](#cordova.plugins.email)</code>  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Different properties of the email like the body, subject |
| callback | <code>function</code> | A callback function to be called with the result |
| scope | <code>Object</code> | The scope of the callback |

<a name="cordova.plugins.email+addAlias"></a>

### cordova.plugins.email.addAlias(alias, packageName)
Adds a new mail app alias.

**Kind**: instance method of <code>[cordova.plugins.email](#cordova.plugins.email)</code>  

| Param | Type | Description |
| --- | --- | --- |
| alias | <code>String</code> | The alias name |
| packageName | <code>String</code> | The package name |

<a name="cordova.plugins.email+isServiceAvailable"></a>

### cordova.plugins.email.isServiceAvailable()
**Kind**: instance method of <code>[cordova.plugins.email](#cordova.plugins.email)</code>  
**Depreacted**:   
<a name="cordova.plugins.email+openDraft"></a>

### cordova.plugins.email.openDraft()
Alias für `open()`.

**Kind**: instance method of <code>[cordova.plugins.email](#cordova.plugins.email)</code>  
