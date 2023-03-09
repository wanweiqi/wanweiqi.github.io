(function (window, document) {

    // we fetch the elements each time because docusaurus removes the previous
    // element references on page navigation
    function getElements() {
        return {
            layout: document.getElementById('layout'),
            menu: document.getElementById('menu'),
            menuLink: document.getElementById('menuLink')
        };
    }

    function toggleClass(element, className) {
        var classes = element.className.split(/\s+/);
        var length = classes.length;
        var i = 0;

        for (; i < length; i++) {
            if (classes[i] === className) {
                classes.splice(i, 1);
                break;
            }
        }
        // The className is not found
        if (length === classes.length) {
            classes.push(className);
        }

        element.className = classes.join(' ');
    }

    function toggleAll() {
        var active = 'active';
        var elements = getElements();

        toggleClass(elements.layout, active);
        toggleClass(elements.menu, active);
        toggleClass(elements.menuLink, active);
    }
    
    function handleEvent(e) {
        var elements = getElements();
        
        if (e.target.id === elements.menuLink.id) {
            toggleAll();
            e.preventDefault();
        } else if (elements.menu.className.indexOf('active') !== -1) {
            toggleAll();
        }
    }



    function addClick(){
        var lis = document.querySelectorAll("#menu .pure-menu ul li");
        var i = 0;
        while(i<lis.length){
            lis[i].index = i;
            lis[i].onclick = function(){
                //点哪个li时，给哪个页面去掉隐藏。并隐藏其他界面
                document.querySelectorAll(".page-content").forEach(element => {
                    if(element.className.indexOf("hidden") == -1)
                        element.className += " hidden";
                });
                var docs = document.querySelectorAll(".page-content");
                console.log(docs);
                docs[this.index].className = docs[this.index].className.replace("hidden","");

                //全部li消失颜色.有pure-menu-selected名字的失去名字
                var selectlis = document.querySelectorAll(".pure-menu-selected");
                var j = 0;
                for(j=0;j<selectlis.length;j++){
                    selectlis[j].className = selectlis[j].className.replace("pure-menu-selected","");
                }
                //并且哪个页面的对应菜单变色
                this.className += " pure-menu-selected";
            }
            i++;
        }
    }

    addClick(); //添加事件:用户点哪个菜单显示哪页

    document.addEventListener('click', handleEvent);

}(this, this.document));
