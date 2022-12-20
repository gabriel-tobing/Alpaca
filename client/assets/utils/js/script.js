window.addEventListener("scroll", () => {
    const navbarEl = document.getElementById("navbar");

    navbarEl.classList.toggle("scroll", window.scrollY > 0);
});

// $(document).ready(function() {
//     const panelOne = $(".form-panel.two").height();
//     const panelTwo = $(".form-panel.two")[0].scrollHeight;

//     $(".form-panel.two").not(".form-panel.two.active").on("click", function(e) {
//         e.preventDefault();

//         $(".form-toggle").addClass("visible");
//         $(".form-panel.one").addClass("hidden");
//         $(".form-panel.two").addClass("active");
//         $(".form").animate({
//         "height": panelTwo
//         }, 200);
//     });

//     $(".form-toggle").on("click", function(e) {
//         e.preventDefault();
        
//         $(this).removeClass("visible");
//         $(".form-panel.one").removeClass("hidden");
//         $(".form-panel.two").removeClass("active");
//         $(".form").animate({
//         "height": panelOne
//         }, 200);
//     });
// });



const searchMenuEl = document.getElementById("search-menu");

searchMenuEl.addEventListener("keyup", () => {
    const userValue = searchMenuEl.value;

    searchMenuEl.setAttribute("value", userValue);
    
    const getValue = searchMenuEl.getAttribute("value");

    fetch(`http://localhost:3000/menu/cari?q=${getValue}`)
        .then(response => response.json())
        .then(response => {
            const datas = response.data;

            console.log(datas)

            let elements = "";

            datas.forEach(data => elements += showButton(data));

            const searchListEl = document.getElementById("search-list");

            searchListEl.innerHTML = elements;

            const foodSearchEl = document.querySelectorAll("#food-search");

            searchButton(foodSearchEl);
        });
});

searchMenuEl.addEventListener("focus", () => {
    const userValue = searchMenuEl.value;

    searchMenuEl.setAttribute("value", userValue);
    
    const getValue = searchMenuEl.getAttribute("value");

    fetch(`http://localhost:3000/menu/cari?q=${getValue}`)
        .then(response => response.json())
        .then(response => {
            const datas = response.data;

            let elements = "";

            datas.forEach(data => elements += showButton(data));

            const searchListEl = document.getElementById("search-list");

            searchListEl.innerHTML = elements;

            searchListEl.style.display = "block";

            const foodSearchEl = document.querySelectorAll("#food-search");

            searchButton(foodSearchEl);
            
        });
});

const showButton = (data) => {
    return `
        <button type="button" class="food-search list-group-item list-group-item-action" data-name="${data.name}" id="food-search">${data.name}</button>
    `
}

const searchButton = (elements) => {
    if(elements.length == 1) {
        elements[0].addEventListener("click", () => {
            const name = elements[0].dataset.name;

            searchMenuEl.value = name;
            searchMenuEl.setAttribute("value", name);

            fetch(`http://localhost:3000/menu/cari/makanan?s=${name}`)
                .then(response => response.json())
                .then(response => {
                    const data = response.data[0];

                    let elements = "";

                    elements += showCards(data);

                    const foodListEl = document.getElementById("food-list");

                    foodListEl.innerHTML = elements;
                });

            const searchListEl = document.getElementById("search-list");

            searchListEl.style.display = "none";
        });
    } else {
        elements.forEach((element) => {
            element.addEventListener("click", () => {
                const name = element.dataset.name;

                searchMenuEl.value = name;
                searchMenuEl.setAttribute("value", name);

                fetch(`http://localhost:3000/menu/cari/makanan?s=${name}`)
                    .then(response => response.json())
                    .then(response => {
                        const datas = response.data;

                        let elements = "";

                        datas.forEach(data => elements += showCards(data));

                        const foodListEl = document.getElementById("food-list");

                        foodListEl.innerHTML = elements;

                        foodListEl.addEventListener("click", () => {
                            const searchListEl = document.getElementById("search-list");

                            searchListEl.style.display = "none";
                        });
                    });

                const searchListEl = document.getElementById("search-list");

                searchListEl.style.display = "none";
            });
        });
    }
}

const showCards = (data) => {
    if(data.discount == null) {
        return `
            <div class="card-group">
                <div class="card border-2" data-name="${ data.name }">
                    <div class="image-container">
                        <img src="https://cdn0-production-images-kly.akamaized.net/OrdT-pJk5REpdRONTOKTgn0xOz4=/640x360/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/1697136/original/002803100_1504182506-amazingraze.s3.amazonaws.com1.jpg" class="card-img-top" alt="...">
                    </div>
                    <div class="card-body p-2">
                        <h5 class="title card-text mb-3">${ data.name }</h5>

                        <div class="d-flex align-items-center gap-2">
                            <h4 class="title mb-0">Rp ${ data.price }</h4>
                        </div>

                        <div class="mt-3">
                            <a href="order.html/${ data.id }" class="primary-button shadow-sm">Pesan Sekarang</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else {
        return `
            <div class="card-group">
                <div class="card border-2" data-name="${ data.name }">
                    <div class="image-container">
                        <img src="https://cdn0-production-images-kly.akamaized.net/OrdT-pJk5REpdRONTOKTgn0xOz4=/640x360/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/1697136/original/002803100_1504182506-amazingraze.s3.amazonaws.com1.jpg" class="card-img-top" alt="...">
                    </div>
                    <div class="card-body p-2">
                        <h5 class="title card-text mb-3">${ data.name }</h5>

                        <div class="d-flex align-items-center gap-2">
                            <h4 class="title mb-0">Rp ${ ((data.discount / 100) * data.price) }</h4>
                            <h4 class="title promo mb-0">Rp ${ data.price }</h4>
                        </div>

                        <div class="mt-3">
                            <a href="order.html/${ data.id }" class="primary-button shadow-sm">Pesan Sekarang</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}