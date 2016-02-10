describe('TableControler', function () {
	
	var $httpBackend, controleur;

	/* Init module */
	beforeEach(module('articleApp'));

	beforeEach(inject(function(_$httpBackend_, $controller){
		$httpBackend = _$httpBackend_;
		var url = "https://api.mongolab.com/api/1/databases/books/collections/books/?apiKey=d3qvB8ldYFW2KSynHRediqLuBLP8JA8i";
		$httpBackend.expectGET(url)
					.respond([{'ISBN-10' : '1234567890', title : 'la maison de michey', price : 12},
							  {'ISBN-10' : '4563789212', title : 'Zootopia', price : 7}]);
		controleur = $controller('TableControler', {});
	}));


	it('should acces a catalog', function () {
		expect(controleur.catalogue).toBeUndefined();
		$httpBackend.flush();
		expect(controleur.catalogue).toEqual([{'ISBN-10' : '1234567890', title : 'la maison de michey', price : 12},
											  {'ISBN-10' : '4563789212', title : 'Zootopia', price : 7}]);
	});

	it("should remove a row", function () {
		controleur.articles = [
			{ref: 'XXX', lib: 'xxx', prix: 10, quantite: 1},
			{ref: 'YYY', lib: 'yyy', prix: 20, quantite: 2},
			{ref: 'ZZZ', lib: 'zzz', prix: 30, quantite: 3}
		];
		controleur.deleteobject = controleur.articles[1]; 
		controleur.deleteArticle();
		expect(controleur.articles).toEqual([
			{ref: 'XXX', lib: 'xxx', prix: 10, quantite: 1},
			{ref: 'ZZZ', lib: 'zzz', prix: 30, quantite: 3}
		]);
	});

	it("should add a row from catalog", function () {
		controleur.articles = [
			{ref: 'XXX', lib: 'xxx', prix: 10, quantite: 1},
			{ref: 'YYY', lib: 'yyy', prix: 20, quantite: 2},
			{ref: 'ZZZ', lib: 'zzz', prix: 30, quantite: 3}
		];
		controleur.add = {};
		controleur.addobject ={};
		controleur.add.selected = {'ISBN-10': 'AAAA', title: 'Test1', price: 11};
		controleur.addobject.quantite = 5;
		controleur.addCatalogue();

		dump(controleur.articles);
		dump([
			{ref: 'XXX', lib: 'xxx', prix: 10, quantite: 1},
			{ref: 'YYY', lib: 'yyy', prix: 20, quantite: 2},
			{ref: 'ZZZ', lib: 'zzz', prix: 30, quantite: 3},
			{ref: 'AAAA', lib: 'Test1', prix: 11, quantite: 5}
		]);

		expect(controleur.articles).toEqual([
			{ref: 'XXX', lib: 'xxx', prix: 10, quantite: 1},
			{ref: 'YYY', lib: 'yyy', prix: 20, quantite: 2},
			{ref: 'ZZZ', lib: 'zzz', prix: 30, quantite: 3},
			{ref: 'AAAA', lib: 'Test1', prix: 11, quantite: 5}
		]);
	});

/*	it("should calculate the TTC price", function() {
		controleur.articles = [
			{ref: 'XXX', lib: 'xxx', prix: 10, quantite: 1},
			{ref: 'YYY', lib: 'yyy', prix: 20, quantite: 2},
			{ref: 'ZZZ', lib: 'zzz', prix: 30, quantite: 3}
		];


	});*/

});