'use strict';



describe('articleApp', function() {
  var articleList;
  var references;
  var ctrl;

  beforeEach(function(){
    browser.get('http://localhost:8000/app/index.html');
    articleList = element.all(by.repeater('article in tableList.articles'));
    references = element.all(by.repeater('article in tableList.articles').column("article.ref"));
  });

  it('should have 3 initial rows', function() {
    expect(articleList.count()).toEqual(3);
    expect(references.last().getText()).toEqual("03");
  });

  it('should remove a row', function() {
    var deletedRow = element(by.model('tableList.deleteobject'));
    var deleteButton = element(by.css('[value="Supprimer"]'));
    deletedRow.sendKeys('02');
    deleteButton.click();
    expect(articleList.count()).toEqual(2);
    
    /* Verif de suppression avec filter */
    var articlefiltre = element.all(by.repeater('article in tableList.articles')).filter(function(elm, index){
      return elm.element(by.binding("article.ref")).getText().then(function(text){
        return text == '02';
      });
    });

    expect(articlefiltre.count()).toEqual(0);
  });

  

  
});
