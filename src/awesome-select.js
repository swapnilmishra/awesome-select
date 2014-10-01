;(function(){
    window.AwesomeSelect = {} || window.AwesomeSelect;

    window.AwesomeSelect.elArray = [];

    window.AwesomeSelect.registerEl = function(el){
        window.AwesomeSelect.elArray.push(el);
    }

    window.AwesomeSelect.isBodyEventAttached = false;

    window.AwesomeSelect.globals = {

        attachGlobalHandlers : function () {
            console.log("attaching global event");
            var that = this;    
            $(document).on('click', function(event){
              if (!$(event.target).closest('.select-box').length) {
                console.log("click happened somewhere else");
                that.hideAllDropdowns();
              }
              else {
                var targetId = $(event.target).closest('.select-box').find("select").attr("id");
                console.log("click happened in select and the id is " + targetId);
                that.hideAllButOne(targetId);
              }
            });
            window.AwesomeSelect.isBodyEventAttached = true;            
        },

        hideAllDropdowns : function(){
            $.each(window.AwesomeSelect.elArray, function(){
                $(this).hide();    
            });
        },

        hideAllButOne : function (elId) {
            $.each(window.AwesomeSelect.elArray,function(idx,el){
                if(el.closest('.select-box').find("select").attr("id") !== elId){
                    el.hide();
                }
            });
        }
    };

    window.AwesomeSelect.awesome  = function(el,options){

        var _private = {

            $el : undefined,

            $parentEl : undefined,

            el : undefined,

            $dropdown : undefined,

            $selected : undefined,

            $originalSelect : undefined,

            options : undefined,

            // el is id of select element
            makeMeAwesome : function(el,options){

                if(options){
                    this.options = options;
                }
                if(el){
                    this.el = el;
                    this.generateHTML();
                    this.$el = $(el);
                    this.$parentEl = $(el).parents('.select-box');
                    this.init();
                }
                else {
                    console.log("Dude pass in a id or class");
                }
                if(!window.AwesomeSelect.isBodyEventAttached){
                    window.AwesomeSelect.globals.attachGlobalHandlers();
                }
            },

            init : function(){

                var $options = $(this.el + ' option');
                var defaultValue = '';

                $(this.el).hide();

                this.$selected = this.$parentEl.find('.selected');

                if($options.length > 0){
                    defaultValue = $( $options.get(0) ).html();
                }

                this.$selected.html(defaultValue);

                this.bindEventHandlers();
            },

            bindEventHandlers : function(){

                var that = this,
                    options = this.options,
                    val,
                    dataVal;

                that.$originalSelect = that.$parentEl.find('select');

                if(options && options.onChange){
                    this.$originalSelect.on('change', options.onChange);
                }

                this.$parentEl.on('click', function(){
                    // console.log("Click on parent");
                    that.$dropdown = $(this).find('.dropdown');
                    that.$dropdown.toggle();
                    window.AwesomeSelect.registerEl(that.$dropdown);
                });

                this.$parentEl.find('li').on('click', function(event){
                    // console.log("Click on child");
                    val = $(this).text();
                    dataVal = $(this).attr("data-value");
                    that.$selected.text(val);
                    that.$originalSelect.val(dataVal);
                    that.$originalSelect.trigger('change');
                });
            },

            generateHTML : function(){
                var hash = [];
                var el = this.el;
                var container = $(el).css("display","none").parent();

                $(el + " option").each(function(idx,el){
                    hash.push({
                        value : $(el).val(),
                        html : $(el).html()
                    });
                });

                var parentEl = createParent();
                var selPlaceholderEl =  createSelPlaceholder(parentEl);
                var ulEl = createUl();
                for(var i=0; i < hash.length; i++){
                    ulEl.append( $("<li>").attr("data-value",hash[i].value).html(hash[i].html) );
                }
                var actualEl = $(el);
                parentEl.append(selPlaceholderEl);
                parentEl.append(ulEl);
                parentEl.insertBefore(el);
                parentEl.append( $(el) );

                function createParent(){
                    return $("<div>").addClass("select-box");
                }

                function createSelPlaceholder(){
                    var newDiv = $("<div>").addClass("selected");
                    return newDiv;
                }

                function createUl(){
                    var newUl = $("<ul>").addClass("dropdown").css("display", "none");
                    return newUl;
                }
            }
        };

        _private.makeMeAwesome(el,options);

    }
})();