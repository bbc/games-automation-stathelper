# games-automation-stathelper
The `statFormatter.js` is a simple helper file which takes a `.json` object in the form of a stat spec and produces four things. These four elements can all be used to striclty assert the output of a network request when an ATI stat fires. This is a tool for translating a stat spec into an output which can be used to assert against stats being fired. It does not provide a method for intercepting the stat request. This should be done by the tool being used. For instance Cypress uses `Cy.intercept()`.

A bucket string in format `s=$bucketId` (this is only currently setup for Prod Games and Test Games stat buckets). This can be used to assert stats are getting fired in the correct bucket.

A counterName string in format `$counterName.$screen.page` which can be used to assert the page is correct on either page views or user actions.

A stat string in the format the stats get fired in the network tab. This bundles each of the separate fields from a stat spec and outputs it in a format which can be used to assert against network output. The format is as shown below;

`[$campaignId]-[creationId]-[$variant]-[$format]-[$generalPlacement.$screen.page]-[detailedPlacement]-[$advertiserId]-[$url]`;

A string which details the type of stat event being fired in the format `echo_event=$event`, which can be used to assert the correct type of stat being fired.

## usage

You can access each of these four outputs by specifying the property on the function call

e.g.

```javascript
    formatStatConfig( statData ).stat
    formatStatConfig( statData ).bucket
    formatStatConfig( statData ).counterName
    formatStatConfig( statData ).event
```

### Setting up a stat spec object / several stat spec objects

The recommended way to make use of this stat helper & improve maintainability of the automated tests is to create a stat object for each stat you wish to test. These can be either stores in the test file or extracted into its own stat config file.

e.g.

stat object

```javascript
const pageViewStat = {
    counterName: "keepalive.example.spec",
    screenName: "examplePage",
    bucket: "testGames",
    event: "page",
  }
}

const userActionStat = {
    campaignId: "Page",
    creationId: "example~click",
    variant: "",
    format: "EXAMPLE=1", 
    generalPlacement: "keepalive.example.spec",
    detailedPlacement: "",
    advertiserId: "keepalive.example.spec.game",
    url:"https://example.com",
    countername: "keepalive.example.spec.game",
    screenName: "home",
    bucket: "testGames",
    event: "user_action",
}
```

Calling the `formatStatConfig()` function and passing in the stat object

```javascript
formatStatConfig( userActionStat ).stat;
```

We also have the option to override any of those stat object properties in-line. For example, you may test the same stat multiple times but have different meta-data get passed into the `format` field. Whatever was pass in at runtime will take presedence over the value in the original object. e.g.

```javascript
 formatStatConfig ( userActionStat, { format: "EXAMPLE=2" }).stat
```

### Calling the function and passing in each stat parameter in-line

The second way which the stat helper can be called is by calling `formatStatConfig()` and passing in each parameter at the time the function is called.

e.g.

```javascript
formatStatConfig( { campaignId: "value",
                    creationId: "value",
                    variant: "value", 
                    format: "value", 
                    generaPlacement: "value",
                    screen: "value", 
                    detailedPlacement: "value",
                    advertiserId: "value",
                    url: "value", 
                    event: "value",
                    bucket: "value" } ).stat
```
Here we define the stat spec details at the time of calling the function. All of these parameters are optional. Where parameters are not provided, the stat string output will result in an empty square brackets.