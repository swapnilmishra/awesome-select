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

    window.AwesomeSelect.awesome  = function(el){

        var _private = {

            $el : undefined,

            $parentEl : undefined,

            el : undefined,

            $dropdown : undefined,

            $selected : undefined,

            $originalSelect : undefined,

            makeMeAwesome : function(el){
                if(el){
                    this.$el = $(el);
                    this.el = el;
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

                var that = this;

                this.$parentEl.on('click', function(){
                    // console.log("Click on parent");
                    that.$dropdown = $(this).find('.dropdown');
                    that.$dropdown.toggle();
                    window.AwesomeSelect.registerEl(that.$dropdown);
                });

                this.$parentEl.find('li').on('click', function(event){
                    // console.log("Click on child");
                    that.$originalSelect = that.$parentEl.find('select');
                    val = $(this).text();
                    that.$selected.text(val);
                    that.$originalSelect.val(val);
                });
            }
        };

        _private.makeMeAwesome(el);

    }
})();