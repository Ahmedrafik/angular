'use strict';

var TAXE = 26;
var URL = "https://api.mongolab.com/api/1/databases/books/collections/books/?apiKey=d3qvB8ldYFW2KSynHRediqLuBLP8JA8i";

angular.module('articleApp', [])
	.controller('TableControler', function($http, $scope){
		var tableList = this;
		
		tableList.prixTTC = function(article){
			var px = article.prix * (1 + TAXE / 100);
			return px;
		};

		tableList.totaux = function(article){
			return tableList.prixTTC(article)*article.quantite;
		};

		tableList.articles = [{ref:'01', lib:'roue', prix:150, quantite:2},
			{ref:'02', lib:'volant', prix:70, quantite:15},
			{ref:'03', lib:'moteur', prix:1530, quantite:3}];

		tableList.addArticle = function(){
			tableList.articles.push(tableList.addobject);
			tableList.addobject = {};
		};

		tableList.addCatalogue = function(){
			tableList.addobject.ref = tableList.add.selected['ISBN-10'];
			tableList.addobject.lib = tableList.add.selected.title;
			tableList.addobject.prix = tableList.add.selected.price;
			tableList.addArticle();
			tableList.add = {};
		};

		tableList.totalcommande= function(){
			var total = 0;
			angular.forEach(tableList.articles, function(article){
				total += tableList.totaux(article);
			});
			return total;
		};
		
		tableList.deleteArticle = function(){		
			var index = tableList.articles.indexOf(tableList.deleteobject);
			tableList.articles.splice(index,1);
		};
		
		$http.get(URL)
		    .then(function (response) {
		       tableList.catalogue = response.data;
	    }, function (response) {
	        throw "Erreur de chargement du catalogue";
	    });

		$scope.$watch('tableList.articles', function(){
			tableList.articles = tableList.articles.filter(function(article){
				return article.quantite > 0 ;
			});
		}, true);

	});
