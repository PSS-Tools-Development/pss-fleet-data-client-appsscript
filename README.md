# Pixel Starships Fleet Data API client

<a href="https://discord.gg/kKguSec" target="_blank"><img src="https://discord.com/api/guilds/565819215731228672/embed.png" alt="Support Discord server invite"></a>

> A stateless Google Apps Script library to access the [PSS Fleet Data API](https://github.com/Zukunftsmusik/pss-fleet-data-api). Currently supported API version is **1.5.x**.

> Current version: **8**

# ✨ Features

- **Easy access** to the official **PSS Fleet Data API** server.
- **Fast setup** to get you started quickly.

# 🚀 Demo
To retrieve the last month's tournament results (a specific Collection):
```javascript
// Retrieve the monthly results in reversed order and take only 1
let apiResponse = PssFleetData.Client.getCollections(null, null, "month", true, 0, 1);

// The resulting response object will have the http response code and if the request was successful, also the parsed response body
if (apiResponse.metadatas != null) { // Check for null, the result set may just be empty
  // Now retrieve the Collection's full data with the collectionId
  let collection = PssFleetData.Client.getCollection(apiResponse.metadatas[0].collectionId).collection;
  
  if (collection) {
    console.log("Last month's collection was collected at: " + collection.timestamp);
    console.log("Last month's collection took " + collection.duration + " seconds");
    console.log("Last month's collection has " + collection.alliances.length + " alliances");
    console.log("Last month's collection has " + collection.users.length + " users");
  }
}
```
The library converts localized `Date` objects to UTC or assumes UTC, if no timezone information is given. Any `Date` objects returned are in UTC.

# ⚙️ Installation
To install the library in your project, search for this script ID:
```sh
1THzQ0jC6YrA2SyWMrHf1QauQdKYI4eMK4H-LhP6s1a9i5UvRa7p3TiaQ
```

# 🖊️ Contribute
If you ran across a bug or have a feature request, please check if there's [already an issue](https://github.com/PSS-Tools-Development/pss-fleet-data-client-appsscript/issues) for that and if not, [open a new one](https://github.com/PSS-Tools-Development/pss-fleet-data-client-appsscript/issues/new).

# 🆘 Support
If you need help using the library or want to contribute, you can join my support Discord at: [discord.gg/kKguSec](https://discord.gg/kKguSec)

# 🔗 Links
- Documentation (tbd)
- [Official Support Discord server](https://discord.gg/kKguSec)
- [PSS Fleet Data API](https://fleetdata.dolores2.xyz)
- [Buy me a can of cat food](https://buymeacoffee.com/the_worst_pss)
- [Or a coffee](https://ko-fi.com/theworstpss)
