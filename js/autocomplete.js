function criarEvento() {
    $.widget("custom.catcomplete", $.ui.autocomplete, {
        _create: function () {
            this._super();
            this.widget().menu("option", "items", "> :not(.autocomplete)");
        },
        _renderMenu: function (ul, items) {
            var that = this,
                currentCategory = "";
            $.each(items, function (index, item) {
                var li;
                if (item.category != currentCategory) {
                    ul.append("<li class='autocomplete'>" + item.category + "</li>");
                    currentCategory = item.category;
                }
                li = that._renderItemData(ul, item);
                if (item.category) {
                    li.attr("aria-label", item.category + " : " + item.label);
                }
            });
        }
    });

    var data = [
        { label: "Iphone", category: "Smartphone" },
        { label: "Samsung", category: "Smartphone" },
        { label: "Motorola", category: "Smartphone" },
        { label: "Asus", category: "Smartphone" },
    ];

    $("#searchbar").catcomplete({
        delay: 0,
        source: data
    });


}