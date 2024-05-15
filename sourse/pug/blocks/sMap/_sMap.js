
var myMap, objectManager

function initMap() { 
  var center = [58.468137, 50.064164];
  myMap = new ymaps.Map('map', {
    center: center,
    zoom: 7,
		clusterize: true,
		gridSize: 34,
    controls: ['zoomControl']
  });

  objectManager = new ymaps.ObjectManager({
    // Чтобы метки начали кластеризоваться, выставляем опцию.
    clusterize: true,
    // ObjectManager принимает те же опции, что и кластеризатор.
    gridSize: 34,
    clusterDisableClickZoom: true
});
objectManager.objects.options.set('preset', 'islands#redDotIcon');
    objectManager.clusters.options.set('preset', 'islands#redClusterIcons');
        // Чтобы задать опции одиночным объектам и кластерам,
    // обратимся к дочерним коллекциям ObjectManager.
    objectManager.objects.options.set({
			iconLayout: 'default#image',
			iconImageHref: 'img/pin-map.svg',
			iconImageSize: [55, 24],
			iconImageOffset: [-24, -38]
    });
    // objectManager.clusters.options.set('preset', 'islands#redClusterIcons');

    myMap.geoObjects.add(objectManager)

		let points = [];
		let getPixelBounds = [];
    $.ajax({
			url: "data.json"
		}).done(function(data) {
			objectManager.add(data);
      points.push(data.features)
      objectManager.objects.options.set('balloonContentLayout', ymaps.templateLayoutFactory.createClass(
        '<div class="coord-item">' +
        `<div class="coord-item__title fw-600">{{properties.balloonContentHeader}}</div>` +
        '<div class="coord-item__item-text">' +
        '<div class="coord-item__info-address small"><span>Адрес</span>: {{properties.balloonContentBody}}</div>' +
        '<div class="coord-item__info-address small"><span>Тел:</span> {{properties.balloonContentFooter}}</div>' +
        '</div>' +
        '</div>'

    ));

  let box = document.querySelector("#storage .box");
  for (i = 0; i < points[0].length; i++) {
    let title= points[0][i].properties.balloonContentHeader
    let address = points[0][i].properties.balloonContentBody
    let coords = points[0][i].geometry.coordinates
    let id = points[0][i].id
      let text = `
      <div class="coord-item" data-index="${i}" data-coords="${id}">
        <div class="coord-item__title">${title}
        </div>
        <div class="coord-item__item-text">
          <div class="coord-item__info-address small"><span>Адрес</span>: ${address}
          </div>
          <div class="coord-item__info-address small"><span>GPS координаты:</span> ${coords}
          </div>
        </div>
      </div>
    `
    box.insertAdjacentHTML('beforeend', text);
      // li[i].style.display = "";
  }
    // Устанавливаем обработчик события клика по объекту
    objectManager.objects.events.add('click', function (e) {
        var objectId = e.get('objectId');
        objectManager.objects.balloon.open(objectId);
    });
			getPixelBounds = objectManager.getPixelBounds();

			myMap.setBounds(myMap.geoObjects.getBounds(), {
				checkZoomRange: true
		});
		});

  let searchList = document.querySelector("#storage .inner-wrap"); 
	if (!searchList) return;
  searchList.addEventListener("click", (e) => {
    const target = e.target.closest(".coord-item")
    if (!target) return;
    showBaloon(target.dataset.index, target.dataset.coords)
  })

  function showBaloon(index, el) {
		var objectState = objectManager.getObjectState(el); 
		myMap.setCenter(points[0][index].geometry.coordinates, 8);

		myMap.geoObjects.add(objectManager);
        // if (objectState.isClustered) {
        //     // Сделаем так, чтобы указанный объект был "выбран" в балуне.
        //     objectManager.clusters.state.set('activeObject', objectManager.objects.getById(el));
        //     // Все сгенерированные кластеры имеют уникальные идентификаторы.
        //     // Этот идентификатор нужно передать в менеджер балуна, чтобы указать,
        //     // на каком кластере нужно показать балун.
        //     objectManager.clusters.balloon.open(objectState.cluster.id);
        // } else {
            objectManager.objects.balloon.open(el);
        // }
  }
  // searchList.addEventListener("click", function (e) {
  //   const target = e.target.closest(".coord-item")
  //   console.log(target);
  //   if (!target) return;
  //   e.preventDefault();
  //   showBaloon(target.dataset.index, target.dataset.coords)
  //   // ymaps.geoQuery(geoObjects).getClosestTo().balloon.open();  
  // })


  // let button = document.querySelector(".sRpnContent__search button");
  // button.addEventListener('click', function () {
  //   var filter, ul, li, a, i;
  //   filter = input.value.toUpperCase();
  //   let searchList = document.getElementById("myDropdown");
  //   li = searchList.querySelectorAll("li");

  //   for (i = 0; i < li.length; i++) {
  //     let txtValue = li[i].querySelector("a").innerText;
  //     if (txtValue.toUpperCase().indexOf(filter) > -1) {
  //       showBaloon(li[i].querySelector("a"))
	// 			document.querySelector(".sRpnContent__search-result").classList.remove('active');
  //     }
  //   }
  // })

};

ymaps.ready(initMap);