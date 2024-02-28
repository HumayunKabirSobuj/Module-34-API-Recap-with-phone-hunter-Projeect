const loadPhone = async (searchText = '13', isShowAll) => {

    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll)

}

const displayPhones = (phones, isShowAll) => {
    // console.log(phones)

    //step 1: select container
    const phoneContainer = document.getElementById('phone-container');
    //clear phone container cards before adding new cards
    phoneContainer.textContent = '';

    const showAllContainer = document.getElementById('show-all-container');
    //display show all button if there are more then 12 phones
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');

    }
    else {
        showAllContainer.classList.add('hidden');

    }

    // console.log("is show all: ", isShowAll)

    //display first 12 phones if not show all 
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }





    phones.forEach(phone => {
        // console.log(phone)
        //step 2: create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-4 bg-base-100 shadow-xl`

        //step 3: set inner html
        phoneCard.innerHTML = `
        
        <figure><img src="${phone.image
            }"
                            alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
                <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        
        `;
        //step 4: append child
        phoneContainer.appendChild(phoneCard);

    });
    //hide loading spinner
    togleLoadingSpinner(false);


}

const handleShowDetail = async (id) => {
    // console.log('clicked show details', id);
    //load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    const phone = data.data;
    console.log(data)
    showPhoneDetails(phone);

}

const showPhoneDetails = (phone) => {
    console.log(phone)

    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;
    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
    
    <div class="flex justify-center my-4">

            <img src="${phone.image}" alt="">

    </div>
    <p><span>Storage: </span> ${phone?.mainFeatures?.storage}</p>
    
    `
    //show the modal
    show_details_modal.showModal();
}

// handle search button

const handleSearch = (isShowAll) => {
    togleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText, isShowAll);
}

const togleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loadingSpinner');
    if (isLoading === true) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}

const handleShowAll = () => {
    handleSearch(true);

}

loadPhone();