// var myMap, objectManager
// function initMap() { 
//   var center = [4.75380038320217, 90.62071970898438];
//   myMap = new ymaps.Map('map', {
//     center: center,
// 		// center: coords[0],
//     zoom: 2,
// 		clusterize: true,
// 		gridSize: 34,
//     controls: ['zoomControl']
//   });

//   objectManager = new ymaps.ObjectManager({
//     // Чтобы метки начали кластеризоваться, выставляем опцию.
//     clusterize: true,
//     // ObjectManager принимает те же опции, что и кластеризатор.
//     gridSize: 34,
//     clusterDisableClickZoom: true
// });

//         // Чтобы задать опции одиночным объектам и кластерам,
//     // обратимся к дочерним коллекциям ObjectManager.
//     objectManager.objects.options.set({
// 			iconLayout: 'default#image',
// 			// iconImageHref: 'img/pin-map.png',
// 			iconImageSize: [37, 46],
// 			iconImageOffset: [-24, -38]
//     });
//     // objectManager.clusters.options.set('preset', 'islands#redClusterIcons');

//     myMap.geoObjects.add(objectManager)
    
		
// 		let  points = [];
// 		let getPixelBounds = [];
//     $.ajax({
// 			url: "data.json"
// 		}).done(function(data) {
// 			objectManager.add(data); 
//       points.push(data.features)
// 			getPixelBounds = objectManager.getPixelBounds();

			
// 			myMap.setBounds(myMap.geoObjects.getBounds(), {
// 				checkZoomRange: true
// 		});
// 		});
	
//   let searchList = document.querySelector(".search-block__result"); 
// 	if (!searchList) return;
//   function showBaloon(index, el) {
    
// 		var objectState = objectManager.getObjectState(el); 
// 		myMap.setCenter(points[0][index].geometry.coordinates, 8);

// 		myMap.geoObjects.add(objectManager);
//         // if (objectState.isClustered) {
//         //     // Сделаем так, чтобы указанный объект был "выбран" в балуне.
//         //     objectManager.clusters.state.set('activeObject', objectManager.objects.getById(el));
//         //     // Все сгенерированные кластеры имеют уникальные идентификаторы.
//         //     // Этот идентификатор нужно передать в менеджер балуна, чтобы указать,
//         //     // на каком кластере нужно показать балун.
//         //     objectManager.clusters.balloon.open(objectState.cluster.id);
//         // } else {
//             objectManager.objects.balloon.open(el);
//         // }
//   }
//   searchList.addEventListener("click", function (e) {
//     const target = e.target.closest(".search-block__link")
//     if (!target) return;
//     e.preventDefault();
//     showBaloon(target.dataset.index, target.dataset.coords)
//     // ymaps.geoQuery(geoObjects).getClosestTo().balloon.open();  
//   })

//   let input = document.querySelector("#suggest1");
//   input.addEventListener('input', function () {
//     var filter, ul, li, a, i;
//     filter = this.value.toUpperCase(); 
//     searchList.innerHTML = '';
//     for (i = 0; i < points[0].length; i++) { 
//       let title= points[0][i].properties.balloonContentHeader
//       let id = points[0][i].id
//       if (title.toUpperCase().indexOf(filter) > -1) {
//         let text = `
//           <li class="sRpnContent__search-item">
//             <a href="#" class="sRpnContent__search-link" data-index="${i}" data-coords="${id}">
//               ${title}
//             </a>
//           </li>
//       `
//       searchList.insertAdjacentHTML('beforeend', text);
//         // li[i].style.display = "";
//       } else {
//         // li[i].style.display = "none";
//       }
//     }
//   })


//   let button = document.querySelector(".sRpnContent__search button");
//   button.addEventListener('click', function () {
//     var filter, ul, li, a, i;
//     filter = input.value.toUpperCase();
//     let searchList = document.getElementById("myDropdown");
//     li = searchList.querySelectorAll("li");

//     for (i = 0; i < li.length; i++) {
//       let txtValue = li[i].querySelector("a").innerText;
//       if (txtValue.toUpperCase().indexOf(filter) > -1) {
//         showBaloon(li[i].querySelector("a"))
// 				document.querySelector(".sRpnContent__search-result").classList.remove('active');
//       }
//     }
//   })

// }; 

// ymaps.ready(initMap);
