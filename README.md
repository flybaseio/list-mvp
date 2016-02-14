# List MVP

Basic MVP for collecting data and displaying a list. Based on [https://levels.io/how-i-build-my-minimum-viable-products/](https://levels.io/how-i-build-my-minimum-viable-products/)

This is meant to be simple to modify, you can use `new.html` to add new records and then `index.html` to view them.

Any form field you add will appear in the index file.

You will need a [flybase.io](https://flybase.io/) account to use this app.

Update `assets/app.js` with your flybase API key and app name.

## form fields

To add fields, you just add them to the `new.html` file, with meta data to tell the app how to use it:

```
<div class='form-element'>
	<label for='blog'>What is your website's homepage URL?</label>
	<input type="url" id='url' data-label="URL" data-order="1" placeholder='http://' class='form-input' required>
</div>
```

- `data-label` will tell the app the actual Label to display in the index
- `data-order` is the sort order to display it by.

When data is saved, it will save a `_meta` field which contains sort order, etc for displaying.

This is meant to all be auto-generating and quick and dirty so feel free to modify and play around with it.