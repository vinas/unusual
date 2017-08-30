//(function() {

    function Display() {

        this.console = console;
        
        return this;

        function console(content) {
            console.log('\n*** unusua ***\n\n'+content);
        }

    }

//})();