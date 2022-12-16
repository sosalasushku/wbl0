const items = [
    {
        id: 743348,
        name: 'Футболка UZcotton мужская',
        props: [
            {
                label: 'Цвет',
                className: 'color',
                value: 'белый'
            },
            {
                label: 'Размер',
                className: 'size',
                value: 56
            }
        ],
        store: 'Коледино WB',
        producer: {
            name: 'OOO Вайлдберриз',
            ogrn: '1067746062449',
            address: '142181, Московская область, д Коледино, тер. Индустриальный Парк Коледино, д. 6 стр. 1',
        },
        stock: 2,
        price: 1051,
        'discounted price': 522,
        isInWishlist: false,
        isAvailable: false,
        img: './data/images/item1.png',
        quantity: 1,
        isChecked: true,
    },
    {
        id: 292620,
        name: 'Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe',
        props: [
            {
                label: 'Цвет',
                className: 'color',
                value: 'прозрачный'
            }
        ],
        store: 'Коледино WB',
        producer: {
            name: 'OOO Мегапрофстиль',
            ogrn: '5167746237148',
            address: '129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34',
        },
        stock: 158,
        price: 2300047,
        'discounted price': 2100047,
        isInWishlist: false,
        isAvailable: false,
        img: './data/images/item2.png',
        quantity: 1,
        isChecked: true,
    },
    {
        id: 193720,
        name: 'Карандаши цветные Faber-Castell "Замок", набор 24 цвета, заточенные, шестигранные, Faber-Castell',
        store: 'Коледино WB',
        producer: {
            name: 'OOO Вайлдберриз',
            ogrn: '1067746062449',
            address: '142181, Московская область, д Коледино, тер. Индустриальный Парк Коледино, д. 6 стр. 1',
        },
        stock: 2,
        price: 950,
        'discounted price': 494,
        isInWishlist: false,
        isAvailable: false,
        img: './data/images/item3.png',
        quantity: 1,
        isChecked: true,
    }
]

let pickpoints = [
    {
        id: 11,
        address: 'г. Бишкек, микрорайон Джал, улица Ахунбаева Исы, д. 67/1',
        isChecked: true,
        type: 'Пункт выдачи',
    },
    {
        id: 12,
        address: 'г. Бишкек, микрорайон Джал, улица Ахунбаева Исы, д. 67/1',
        rating: 4.99,
        isChecked: false,
        type: 'Пункт выдачи',
    },
    {
        id: 13,
        address: 'г. Бишкек, улица Табышалиева, д. 57',
        rating: 4.99,
        isChecked: false,
        type: 'Пункт выдачи',
    }
]

let addresses = [
    {
        id: 1,
        address: 'Бишкек, улица Табышалиева, 57',
        isChecked: false,
        type: 'Курьером по адресу',
    },
    {
        id: 2,
        address: 'Бишкек, улица Жукеева-Пудовкина, 77/1',
        isChecked: false,
        type: 'Курьером по адресу',
    },
    {
        id: 3,
        address: 'Бишкек, микрорайон Джал, улица Ахунбаева Исы, 67/1',
        isChecked: false,
        type: 'Курьером по адресу',
    },
]

const payments = [
    {
        card: 'mir',
        number: '1234 56•• •••• 1234  01/30',
        img: './data/icons/card-mir.png',
        isChecked: true,
    },
    {
        card: 'visa',
        number: '1234 56•• •••• 1234  01/30',
        img: './data/icons/card-visa.png',
        isChecked: false,
    },
    {
        card: 'mastercard',
        number: '1234 56•• •••• 1234  01/30',
        img: './data/icons/card-mastercard.png',
        isChecked: false,
    },
    {
        card: 'another',
        number: '1234 56•• •••• 1234  01/30',
        img: './data/icons/card-another.png',
        isChecked: false,
    },
]

let currentPaymentElement = payments.find(p => p.isChecked).card
let currentDeliveryType = 'pickpoints'

const itemsPurchase = document.getElementById('items-purchase')
const itemsUnavailable = document.getElementById('items-unavailable')
const basketIcon = document.getElementById('basket-menu-icon')
const badge = document.createElement('div')
badge.classList.add('badge', 'show-count')
badge.innerText = items.length
basketIcon.appendChild(badge)

// Валидация форм

function showPlaceholder(el) {
    if (el.value === '') {
        el.nextElementSibling.style.display = 'none'
    } else {
        el.nextElementSibling.style.display = 'flex'
    }
}

function onEmptyField(input, text) {
    if (!input.value.trim()) {
        input.parentNode.lastElementChild.style.display = 'flex'
        input.parentNode.lastElementChild.innerText = text
        input.classList.add('text-error')
        return true
    } else {
        input.parentNode.lastElementChild.style.display = 'none'
        input.classList.remove('text-error')
        return false
    }
}

function validateEmail(input) {
    if (onEmptyField(input, 'Укажите почту')) return null

    const template = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    if (!input.value.match(template)) {
        input.parentNode.lastElementChild.style.display = 'flex'
        input.parentNode.lastElementChild.innerText = 'Проверьте адрес электронной почты'
        console.log('не ОК')
    } else {
        input.parentNode.lastElementChild.style.display = 'none'
        console.log('ОК')
    }
}

function validatePhone(input) {
    if (onEmptyField(input, 'Укажите номер телефона')) return null
    const template = /^[\+][0-9]{11}$/

    if (!input.value.match(template)) {
        input.parentNode.lastElementChild.style.display = 'flex'
        input.parentNode.lastElementChild.innerText = 'Формат: +9 999 999 99 99'
        console.log('не ОК')
    } else {
        input.parentNode.lastElementChild.style.display = 'none'
        console.log('ОК')
    }
}

function validateIndex(input) {
    if (onEmptyField(input, 'Укажите индекс')) return null

    if (!+input.value || input.value.length > 10) {
        input.parentNode.lastElementChild.style.display = 'flex'
        input.parentNode.lastElementChild.innerText = 'Формат: 1234567'
    } else {
        input.parentNode.lastElementChild.style.display = 'none'
    }
}

// Modals

function showModal(el, fn) {
    const body = document.getElementById('body')

    const modalBg = document.createElement('div')
    modalBg.id = 'modal-bg'
    modalBg.classList.add('modal-bg')

    const modal = document.createElement('div')
    modal.classList.add('card', 'card-elevate', 'modal')

    const modalClose = document.createElement('img')
    modalClose.src = './data/icons/close.svg'
    modalClose.classList.add('modal-close')

    fn(modal)

    modal.appendChild(modalClose)
    modalBg.appendChild(modal)

    modalClose.onclick = () => modalBg.remove()

    body.appendChild(modalBg)
}

function showModalDelivery(modal) {
    currentDeliveryType = 'pickpoints'
    const modalTitle = document.createElement('h3')
    modalTitle.innerText = 'Способ доставки'

    const modalContent = document.createElement('div')
    modalContent.classList.add('modal-content')
    const toggleGroup = document.createElement('div')
    toggleGroup.classList.add('toggle-item-group')

    const toggleItem1 = document.createElement('div')
    toggleItem1.classList.add('toggle-item', 'toggle-item-active', 'text-s')
    toggleItem1.id = 'pickpoints'
    toggleItem1.onclick = () => handleDeliveryToggle(toggleItem1)
    toggleItem1.innerText = 'В пункт выдачи'
    toggleGroup.appendChild(toggleItem1)

    const toggleItem2 = document.createElement('div')
    toggleItem2.classList.add('toggle-item', 'text-s')
    toggleItem2.id = 'addresses'
    toggleItem2.onclick = () => handleDeliveryToggle(toggleItem2)
    toggleItem2.innerText = 'Курьером'
    toggleGroup.appendChild(toggleItem2)

    const addressesNote = document.createElement('h5')
    addressesNote.innerText = 'Мои адреса'

    const pickpointsEl = document.createElement('div')
    pickpointsEl.classList.add('modal-content')
    pickpointsEl.id = 'pickpoints-el'
    pickpoints.forEach(p => {
        const modalOption = document.createElement('div')
        modalOption.classList.add('modal-option')
        const deliveryRadioButton = document.createElement('input')
        deliveryRadioButton.type = 'radio'
        deliveryRadioButton.name = 'delivery'
        deliveryRadioButton.id = `delivery-${p.id}`
        deliveryRadioButton.checked = p.isChecked
        modalOption.appendChild(deliveryRadioButton)

        const deliveryLabel = document.createElement('label')
        deliveryLabel.classList.add('modal-label', 'modal-label-col')
        deliveryLabel.for = `delivery-${p.id}`
        deliveryLabel.innerText = p.address

        const pickpointInfo = document.createElement('div')
        pickpointInfo.classList.add('pickpoint-info')

        const ratingIcon = document.createElement('img')
        ratingIcon.src = './data/icons/star.svg'
        ratingIcon.classList.add('pickpoint-info-item')
        pickpointInfo.appendChild(ratingIcon)

        if (p.hasOwnProperty('rating')) {
            const ratingValue = document.createElement('div')
            ratingValue.innerText = p.rating
            ratingValue.classList.add('text-s', 'pickpoint-info-item')
            pickpointInfo.appendChild(ratingValue)
        }

        const subInfo = document.createElement('div')
        subInfo.innerText = 'Пункт выдачи'
        subInfo.classList.add('text-s', 'text-sub', 'pickpoint-info-item')
        pickpointInfo.appendChild(subInfo)

        deliveryLabel.appendChild(pickpointInfo)

        modalOption.appendChild(deliveryLabel)

        const deleteBtn = document.createElement('img')
        deleteBtn.classList.add('delete-address')
        deleteBtn.src = './data/icons/delete-light.svg'
        deleteBtn.onclick = () => deleteAddress(`delivery-${p.id}`)
        modalOption.appendChild(deleteBtn)



        pickpointsEl.appendChild(modalOption)
    })

    const addressesEl = document.createElement('div')
    addressesEl.classList.add('modal-content', 'hidden')
    addressesEl.id = 'addresses-el'
    addresses.forEach(a => {
        const modalOption = document.createElement('div')
        modalOption.classList.add('modal-option')
        const deliveryRadioButton = document.createElement('input')
        deliveryRadioButton.type = 'radio'
        deliveryRadioButton.name = 'delivery'
        deliveryRadioButton.value = a.address
        deliveryRadioButton.id = `delivery-${a.id}`
        deliveryRadioButton.checked = a.isChecked
        modalOption.appendChild(deliveryRadioButton)

        const deliveryLabel = document.createElement('label')
        deliveryLabel.classList.add('modal-label', 'modal-label-col')
        deliveryLabel.for = deliveryRadioButton.id
        deliveryLabel.innerText = a.address
        modalOption.appendChild(deliveryLabel)

        const deleteBtn = document.createElement('img')
        deleteBtn.classList.add('delete-address')
        deleteBtn.src = './data/icons/delete-light.svg'
        deleteBtn.onclick = () => deleteAddress(`delivery-${a.id}`)
        modalOption.appendChild(deleteBtn)

        addressesEl.appendChild(modalOption)
    })

    const deliveryBtn = document.createElement('button')
    deliveryBtn.classList.add('accent-btn', 'modal-btn')
    deliveryBtn.id = 'delivery-btn'
    deliveryBtn.onclick = () => handleChangeDelivery()
    deliveryBtn.innerText = 'Выбрать'

    modal.appendChild(modalTitle)
    modal.appendChild(toggleGroup)
    modal.appendChild(addressesNote)
    modal.appendChild(pickpointsEl)
    modal.appendChild(addressesEl)
    modal.appendChild(deliveryBtn)

    return modal
}

function showModalPayment(modal) {
    const modalTitle = document.createElement('h3')
    modalTitle.innerText = 'Способ оплаты'

    const modalContent = document.createElement('div')
    modalContent.classList.add('modal-content')
    payments.forEach((p, i) => {
        const modalOption = document.createElement('div')
        modalOption.classList.add('modal-option')
        modalOption.value = p.card
        const paymentRadioButton = document.createElement('input')
        paymentRadioButton.type = 'radio'
        paymentRadioButton.name = 'payment'
        paymentRadioButton.value = p.card
        paymentRadioButton.id = p.card
        paymentRadioButton.checked = p.isChecked
        modalOption.appendChild(paymentRadioButton)

        const paymentLabel = document.createElement('label')
        paymentLabel.classList.add('modal-label')
        paymentLabel.for = p.card
        const paymentLabelImg = document.createElement('img')
        paymentLabelImg.src = p.img
        paymentLabelImg.alt = ''
        paymentLabel.appendChild(paymentLabelImg)
        const paymentLabelText = document.createElement('div')
        paymentLabelText.innerText = p.number
        paymentLabel.appendChild(paymentLabelText)
        modalOption.appendChild(paymentLabel)

        modalContent.appendChild(modalOption)
    })

    const paymentBtn = document.createElement('button')
    paymentBtn.classList.add('accent-btn', 'modal-btn')
    paymentBtn.id = 'payment-btn'
    paymentBtn.onclick = () => handleChangePayment()
    paymentBtn.innerText = 'Выбрать'

    modalContent.appendChild(paymentBtn)

    modal.appendChild(modalTitle)
    modal.appendChild(modalContent)

    return modal
}

function handleDeliveryToggle(el) {
    if (el.classList.contains('toggle-item-active')) return null

    currentDeliveryType = el.id
    console.log(currentDeliveryType)

    el.classList.add('toggle-item-active')
    document.getElementById(`${el.id}-el`).classList.remove('hidden')

    const sibling = el.previousElementSibling || el.nextElementSibling
    sibling.classList.remove('toggle-item-active')
    document.getElementById(`${sibling.id}-el`).classList.add('hidden')
}

function handleChangeDelivery() {
    const addressesList = Array.from(document.getElementsByName('delivery'))
    const currentDelivery = addressesList.find(a => a.checked)
    const curArray = currentDeliveryType === 'pickpoints' ? pickpoints : addresses
    curArray.forEach(a => {
        if (`delivery-${a.id}` === currentDelivery.id) {
            a.isChecked = true
        } else a.isChecked = false
    })

    // ------ Меняем содержимое карточки Доставка ------

    const currentDeliveryElement = document.getElementById('current-delivery')
    currentDeliveryElement.innerHTML = currentDelivery.nextElementSibling.innerHTML
    currentDeliveryElement.previousElementSibling.innerText = currentDeliveryType === 'pickpoints' ? 'Пункт выдачи' : 'Курьером по адресу'

    if (currentDeliveryType === 'pickpoints') {
        currentDeliveryElement.lastElementChild.lastElementChild.innerText = 'Ежедневно с 10 до 21'
        currentDeliveryElement.lastElementChild.lastElementChild.classList.remove('text-sub')
    }

    // ----- Меняем содержимое карточки Итого -----

    const currentDeliveryTotalElement = document.getElementById('current-delivery-total')
    currentDeliveryTotalElement.innerHTML = currentDelivery.nextElementSibling.innerHTML
    currentDeliveryTotalElement.lastElementChild.remove()

    const title = document.getElementById('delivery-total-title')
    title.innerText = currentDeliveryType === 'pickpoints' ? 'Доставка в пункт выдачи' : 'Доставка курьером'

    const elementsToReveal = document.getElementsByClassName('delivery-hidden')
    for (let el of elementsToReveal) {
        el.classList.remove('hidden')
    }

    document.getElementById('modal-bg').remove()
}

function handleChangePayment() {
    const paymentsList = Array.from(document.getElementsByName('payment'))
    const currentPayment = paymentsList.find(p => p.checked)
    payments.forEach(p => {
        if (p.card === currentPayment.value) p.isChecked = true
        else p.isChecked = false
    })
    currentPaymentElement = currentPayment.nextElementSibling

    const elementsToUpdate = document.getElementsByClassName('current-payment')
    for (let el of elementsToUpdate) {
        el.innerHTML = currentPaymentElement.innerHTML
        el.classList.add('modal-label')
    }

    const paymentNotes = document.getElementsByClassName('payment-hidden')
    for (let el of paymentNotes) {
        el.classList.remove('hidden')
    }

    document.getElementById('modal-bg').remove()
}

function toggleItems(el) {
    const curItems = el.parentNode.nextElementSibling
    if (curItems.classList.contains('hidden')) {
        curItems.classList.remove('hidden')
        el.style.transform = 'rotate(0)'
    } else {
        curItems.classList.add('hidden')
        el.style.transform = 'rotate(-180deg)'
    }
}

function addToWishList(id, el) {
    const curItem = items.find(i => i.id === id)
    curItem.isInWishlist = !curItem.isInWishlist
    if (curItem.isInWishlist === true) {
        document.getElementById(`${id}-wl`).classList.add('active-icon')
        document.getElementById(`${id}-wl-unavailable`).classList.add('active-icon-unavailable')
    } else {
        document.getElementById(`${id}-wl`).classList.remove('active-icon')
        document.getElementById(`${id}-wl-unavailable`).classList.remove('active-icon-unavailable')
    }
}

function deleteItem(id) {
    document.getElementById(`item-${id}`).remove()
    document.getElementById(`unavailable-item-${id}`).remove()
    updateUnavailable()
    updateCount()
}

function deleteAddress(id) {
    const elToDelete = document.getElementById(id).parentElement
    elToDelete.remove()
}

function decrementItems(id, el) {
    const curItem = items.find(it => +id === +it.id)
    const curValue = document.getElementById(id)
    curValue.setAttribute('value', --curItem.quantity)
    handleChangeQuantity(id, el.nextElementSibling)
}

function incrementItems(id, el) {
    const curItem = items.find(it => +id === +it.id)
    const curValue = document.getElementById(id)
    curValue.setAttribute('value', ++curItem.quantity)
    handleChangeQuantity(id, el.previousElementSibling)
}

function handleChangeQuantity(id, el) {
    const curItem = items.find(it => +id === +it.id)
    if (+el.value >= curItem.stock) el.nextElementSibling.disabled = true
    if (+el.value < curItem.stock) el.nextElementSibling.disabled = false
    if (+el.value <= 1) el.previousElementSibling.disabled = true
    if (+el.value > 1) el.previousElementSibling.disabled = false

    document.getElementById(`price-${id}`).innerText = `${curItem.price * curItem.quantity} сом`
    document.getElementById(`init-price-${id}`).innerText = `${curItem['discounted price'] * curItem.quantity} сом`

    updateTotal()
}

function handleChangeCheckbox(id) {
    const curItem = items.find(it => +id === +it.id)
    curItem.isChecked = !curItem.isChecked
    const checkAll = document.getElementById('check-all')
    const inputs = itemsPurchase.getElementsByClassName('checkbox')
    checkAll.checked = true

    for (let el of inputs) {
        if (el.checked === false) checkAll.checked = false
    }

    updateTotal()
}

function handleChangeCheckAll() {
    const checkAll = document.getElementById('check-all')
    const inputs = itemsPurchase.getElementsByClassName('checkbox')

    for (let el of inputs) {
        el.checked = checkAll.checked
        items.forEach(i => i.isChecked = checkAll.checked)
    }

    updateTotal()
}

function updateUnavailable() {
    document.getElementById('unavailable-count').innerText = itemsUnavailable.childElementCount
}

function updateCount() {
    const elementsToUpdate = document.getElementsByClassName('show-count')

    for (let el of elementsToUpdate) {
        el.innerText = itemsPurchase.childElementCount
    }

}

function countTotal() {
    const total = items.filter(i => i.isChecked).reduce(((sum, cur) => sum + cur['discounted price'] * cur.quantity), 0)
    return total
}

function updateTotal() {
    const priceTotal = countTotal()
    document.getElementById('total').innerText = `${priceTotal} сом`
    if (document.getElementById('total-btn').childElementCount) {
        document.getElementById('total-btn').lastElementChild.innerText = `${priceTotal}`
    }

    const initialTotal = items.filter(i => i.isChecked).reduce(((sum, cur) => sum + cur.price * cur.quantity), 0)
    document.getElementById('initial-total').innerText = `${initialTotal} сом`

    const discountTotal = initialTotal - priceTotal
    document.getElementById('discount-total').innerText = `− ${discountTotal} сом`
}

function toggleImmediately(el) {
    const totalBtn = document.getElementById('total-btn')
    const elsToUpdate = document.getElementsByClassName('payment-note-hidden')
    if (el.checked) {
        totalBtn.innerHTML = `Оплатить <span>${countTotal()}</span> сом`
        for (let el of elsToUpdate) {
            el.classList.add('hidden')
        }
    } else {
        totalBtn.innerText = `Заказать`
        for (let el of elsToUpdate) {
            el.classList.remove('hidden')
        }
    }
}

// Выбранные товары

items.forEach(i => {
    const item = document.createElement('div')
    item.classList.add('item', 'item-purchase')
    item.id = `item-${i.id}`

    // ------- Блок start

    const itemStart = document.createElement('div')
    itemStart.classList.add('item-start')

    const itemCheckbox = document.createElement('input')
    itemCheckbox.type = 'checkbox'
    itemCheckbox.checked = i.isChecked
    itemCheckbox.classList.add('checkbox')
    itemCheckbox.onchange = (id) => handleChangeCheckbox(i.id)
    itemStart.appendChild(itemCheckbox)

    const itemImg = document.createElement('img')
    itemImg.classList.add('item-img')
    itemImg.src = i.img
    itemStart.appendChild(itemImg)

    if (i.hasOwnProperty('props') && i.props.find(p => p.className === 'size')) {
        const itemSizeBadge = document.createElement('div')
        itemSizeBadge.classList.add('size-badge')
        itemSizeBadge.innerText = i.props.find(p => p.className === 'size').value
        itemStart.appendChild(itemSizeBadge)
    }

    // ------- Блок info

    const itemInfo = document.createElement('div')
    itemInfo.classList.add('item-info')

    const itemInfoName = document.createElement('div')
    itemInfoName.classList.add('item-info-name')
    itemInfoName.innerText = i.name
    itemInfo.appendChild(itemInfoName)

    const itemInfoProps = document.createElement('div')
    itemInfoProps.classList.add('item-info-props')

    if (i.hasOwnProperty('props')) {
        i.props.forEach(pr => {
            const prop = document.createElement('div')
            prop.classList.add('item-info-prop', `item-info-prop-${pr.className}`, 'text-s')
            prop.innerText = `${pr.label}: ${pr.value}`
            itemInfoProps.appendChild(prop)
        })
        if (i.props.className === 'size') {

        }
    }

    itemInfo.appendChild(itemInfoProps)

    const itemInfoStore = document.createElement('div')
    itemInfoStore.classList.add('item-info-store')
    itemInfoStore.innerHTML = `
                <div class="item-info-store-prop text-s text-sub">
                    ${i.store}
                </div>
                <div class="item-info-store-prop text-s text-sub">
                    ${i.producer.name}
                    <img src='./data/icons/info.svg' class='info-icon'>
                    <div class='card popup'>
                        <h5>${i.producer.name}</h5>
                        <div class='text-s'>ОГРН: ${i.producer.ogrn}</div>
                        <div class='text-s'>${i.producer.address}</div>
                    </div>
                </div>
            `
    itemInfo.appendChild(itemInfoStore)

    // ------- Блок configure

    const itemConfigure = document.createElement('div')
    itemConfigure.classList.add('item-configure')

    const itemConfigureCounter = document.createElement('div')
    itemConfigureCounter.classList.add('item-configure-counter')
    itemConfigureCounter.innerHTML = `
                <button class='counter-item counter-btn' value='${i.id}' onclick='decrementItems(${i.id}, this)'>-</button>
                <input type='number' class='counter-item' id='${i.id}' value='${i.quantity}' disabled />
                <button class='counter-item counter-btn' value='${i.id}' onclick='incrementItems(${i.id}, this)'>+</button>
            `

    itemConfigure.appendChild(itemConfigureCounter)

    if (i.stock < 10) {
        const itemConfigureStock = document.createElement('div')
        itemConfigureStock.classList.add('item-configure-stock')
        itemConfigureStock.innerText = `Осталось ${i.stock} шт.`
        itemConfigure.appendChild(itemConfigureStock)
    }

    const itemConfigureBtnGroup = document.createElement('div')
    itemConfigureBtnGroup.classList.add('item-configure-btn-group')
    itemConfigureBtnGroup.innerHTML = `
        <div class='configure-icon' id='${i.id}-wl' onclick='addToWishList(${i.id}, this)'>
            <img src='./data/icons/wishlist.svg'>
        </div>
        <div class='configure-icon' onclick='deleteItem(${i.id})'>
            <img src='./data/icons/delete.svg''>
        </div>
    `
    itemConfigure.appendChild(itemConfigureBtnGroup)

    // ------- Блок price

    const itemPrice = document.createElement('div')
    itemPrice.classList.add('item-price')

    const itemPriceFinal = document.createElement('h4')
    itemPriceFinal.classList.add('item-price-final')
    itemPriceFinal.innerText = `${i.price * i.quantity} сом`
    itemPriceFinal.id = `price-${i.id}`
    itemPrice.appendChild(itemPriceFinal)

    const itemPriceInitialContainer = document.createElement('div')
    itemPriceInitialContainer.classList.add('item-price-initial-container')

    const itemPriceInitial = document.createElement('div')
    itemPriceInitial.classList.add('item-price-initial')
    itemPriceInitial.innerText = `${i['discounted price'] * i.quantity} сом`
    itemPriceInitial.id = `init-price-${i.id}`

    itemPriceInitialContainer.appendChild(itemPriceInitial)

    const discountPopup = document.createElement('div')
    discountPopup.classList.add('card', 'popup')
    discountPopup.innerHTML = `
        <div class='justify-space-between'>
            <div class='text-s text-sub'>Скидка 55%</div>
            <div class='text-s'>-300 сом</div>
        </div>
        <div class='justify-space-between'>
            <div class='text-s text-sub'>Скидка покупателя 10%</div>
            <div class='text-s'>-30 сом</div>
        </div>
    `

    itemPriceInitialContainer.appendChild(discountPopup)
    itemPrice.appendChild(itemPriceInitialContainer)

    // ------- Добавялем все элементы в DOM

    item.appendChild(itemStart)
    item.appendChild(itemInfo)
    item.appendChild(itemConfigure)
    item.appendChild(itemPrice)

    itemsPurchase.appendChild(item)

    handleChangeQuantity(i.id, document.getElementById(i.id))
})

// Нет в наличии

items.filter(i => !i.isAvailable).forEach(i => {
    const item = document.createElement('div')
    item.classList.add('item', 'item-purchase', 'item-unavailable')
    item.id = `unavailable-item-${i.id}`

    const itemStart = document.createElement('div')
    itemStart.classList.add('item-start')

    const itemImg = document.createElement('img')
    itemImg.classList.add('item-img', 'item-img-unavailable')
    itemImg.src = i.img
    itemStart.appendChild(itemImg)

    if (i.hasOwnProperty('props') && i.props.find(p => p.className === 'size')) {
        const itemSizeBadge = document.createElement('div')
        itemSizeBadge.classList.add('size-badge')
        itemSizeBadge.innerText = i.props.find(p => p.className === 'size').value
        itemStart.appendChild(itemSizeBadge)
    }

    const itemInfo = document.createElement('div')
    itemInfo.classList.add('item-info')

    const itemInfoName = document.createElement('div')
    itemInfoName.classList.add('text-sub')
    itemInfoName.innerText = i.name
    itemInfo.appendChild(itemInfoName)

    const itemInfoProps = document.createElement('div')
    itemInfoProps.classList.add('item-info-props')

    if (i.hasOwnProperty('props')) {
        i.props.forEach(pr => {
            const prop = document.createElement('div')
            prop.classList.add('text-s', 'text-sub')
            prop.innerText = `${pr.label}: ${pr.value}`
            itemInfoProps.appendChild(prop)
        })
    }

    itemInfo.appendChild(itemInfoProps)

    item.appendChild(itemStart)
    item.appendChild(itemInfo)

    const itemConfigure = document.createElement('div')
    itemConfigure.classList.add('item-configure')

    const itemConfigureBtnGroup = document.createElement('div')
    itemConfigureBtnGroup.classList.add('item-configure-btn-group')
    itemConfigureBtnGroup.innerHTML = `
        <div class='configure-icon-unavailable' id='${i.id}-wl-unavailable' onclick='addToWishList(${i.id}, this)'>
            <img src='./data/icons/wishlist.svg'>
        </div>
        <div class='configure-icon-unavailable' onclick='deleteItem(${i.id})'>
            <img src='./data/icons/delete.svg''>
        </div>
    `

    itemConfigure.appendChild(itemConfigureBtnGroup)
    item.appendChild(itemConfigure)

    const itemPrice = document.createElement('div')
    itemPrice.classList.add('item-price')
    item.appendChild(itemPrice)

    itemsUnavailable.appendChild(item)
})

// Доставка

items.forEach(i => {

})

updateCount()