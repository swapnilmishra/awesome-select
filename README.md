awesome-select
==============

A lightweight jQuery based custom select


Just initialize the plugin on your select element as given in below example. Optionally you can also pass an ``onChange`` event.

#####HTML#####
```html```
 <select id="otherCategorySelect">
    <option value="">Other</option> 
    <option value="Clothing">Clothing</option> 
    <option value="Electronics">Electronics</option> 
    <option value="Gifts">Gifts</option>
  </select>
```


#####Javascript#####
```javascript
AwesomeSelect.awesome('#otherCategorySelect',{
  // optional onChange event
  onChange : function(){
    alert("I am on change event");
  }
});
```
