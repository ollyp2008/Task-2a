/* ===========================================================
   Dirt Cycles — Shared JS (index + shop)
   - Year stamp
   - Cart badge (localStorage)
   - Shop rendering, filtering, sorting, cart
   =========================================================== */

(function() {
  // Year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Cart count
  const cartCountEl = document.getElementById('cartCount');
  const getCart = () => JSON.parse(localStorage.getItem('dc_cart') || '[]');
  const setCart = (arr) => localStorage.setItem('dc_cart', JSON.stringify(arr));
  const updateCartCount = () => {
    if (!cartCountEl) return;
    const count = getCart().reduce((sum, item)=> sum + (item.qty || 1), 0);
    cartCountEl.textContent = count;
  };
  updateCartCount();

  // If product grid exists, we're on the shop page
  const grid = document.getElementById('productGrid');
  if (!grid) return;

  // ----- Sample product data (expand as needed) -----
  const products = [
    {
      id: 'trail-master-29',
      brand: 'Dirt Cycles',
      model: 'Trail Master 29',
      category: 'Trail',
      wheel: '29',
      travelF: 140, travelR: 130,
      frame: 'Alloy',
      weight: 13.9,
      drivetrain: 'Shimano SLX 12s',
      brakes: 'Shimano 4‑piston, 180/180',
      price: 2499,
      img: 'static/img/bike-trail.jpg',
      desc: 'Balanced trail geometry, tough alloy frame, reliable SLX drivetrain.'
    },
    {
      id: 'enduro-pro-170',
      brand: 'Dirt Cycles',
      model: 'Enduro Pro 170',
      category: 'Enduro',
      wheel: 'Mullet',
      travelF: 170, travelR: 160,
      frame: 'Carbon',
      weight: 14.8,
      drivetrain: 'SRAM GX Eagle 12s',
      brakes: 'SRAM Code RSC, 200/200',
      price: 3899,
      img: 'static/img/bike-enduro.jpg',
      desc: 'Slack, fast and planted. Mullet setup with big brakes and race‑ready spec.'
    },
    {
      id: 'gravity-dh-elite',
      brand: 'Dirt Cycles',
      model: 'Gravity DH Elite',
      category: 'DH',
      wheel: '29',
      travelF: 200, travelR: 200,
      frame: 'Alloy',
      weight: 16.6,
      drivetrain: 'SRAM DH 7s',
      brakes: 'Shimano Saint, 220/203',
      price: 4999,
      img: 'static/img/bike-dh.jpg',
      desc: 'Dual‑crown precision with race geometry for steep technical descents.'
    },
    {
      id: 'xc-pace-100',
      brand: 'Dirt Cycles',
      model: 'XC Pace 100',
      category: 'XC',
      wheel: '29',
      travelF: 100, travelR: 0,
      frame: 'Carbon',
      weight: 10.9,
      drivetrain: 'Shimano XT 12s',
      brakes: 'Shimano 2‑piston, 160/160',
      price: 2799,
      img: 'static/img/bike-trail.jpg',
      desc: 'Lightweight hardtail with race‑efficiency and quick handling.'
    },
    {
      id: 'dj-park-pro',
      brand: 'Dirt Cycles',
      model: 'DJ Park Pro',
      category: 'DJ',
      wheel: '26',
      travelF: 100, travelR: 0,
      frame: 'Alloy',
      weight: 11.6,
      drivetrain: 'Single speed',
      brakes: 'Rear hydraulic only',
      price: 1199,
      img: 'static/img/bike-trail.jpg',
      desc: 'Burly dirt‑jump frame, short rear end, skatepark tough.'
    },
    {
      id: 'e-trail-boost',
      brand: 'Dirt Cycles',
      model: 'E‑Trail Boost',
      category: 'e-MTB',
      wheel: '29',
      travelF: 150, travelR: 140,
      frame: 'Alloy',
      weight: 22.4,
      drivetrain: 'Shimano Deore 12s',
      brakes: '4‑piston, 200/200',
      price: 4299,
      img: 'static/img/bike-enduro.jpg',
      desc: 'Power‑assisted trail bike with strong brakes and confident geo.'
    }
  ];

  // ----- Elements -----
  const filterCategory = document.getElementById('filterCategory');
  const filterWheel = document.getElementById('filterWheel');
  const filterMaxPrice = document.getElementById('filterMaxPrice');
  const sortBy = document.getElementById('sortBy');
  const btnApply = document.getElementById('applyFilters');
  const btnClear = document.getElementById('clearFilters');

  // ----- Render -----
  function render(list){
    grid.innerHTML = '';
    if (list.length === 0){
      grid.innerHTML = `<p class="hint">No bikes match your filters. Try expanding your budget or clearing a filter.</p>`;
      return;
    }
    for (const p of list){
      const card = document.createElement('article');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${p.img}" alt="${p.brand} ${p.model} — ${p.category} ${p.wheel}${p.wheel !== '26' ? '”' : '”'} wheels" loading="lazy" />
        <div class="product-meta">
          <span class="badge">${p.category}</span>
          <span class="badge">${p.wheel}"</span>
          ${p.frame === 'Carbon' ? `<span class="badge" style="background:rgba(120,179,144,.16);border-color:rgba(120,179,144,.4);">Carbon</span>` : ``}
        </div>
        <h3>${p.brand} ${p.model}</h3>
        <p class="specs">${p.travelF}/${p.travelR || 0}mm • ${p.frame} • ${p.drivetrain} • ${p.brakes} • ${p.weight} kg</p>
        <p class="specs">${p.desc}</p>
        <p class="price">£${p.price.toLocaleString()}</p>
        <div class="actions">
          <button data-id="${p.id}" class="add-cart">Add to Cart</button>
        </div>
      `;
      grid.appendChild(card);
    }

    // attach add-to-cart handlers
    grid.querySelectorAll('.add-cart').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const id = btn.getAttribute('data-id');
        addToCart(id);
      });
    });
  }

  // ----- Filters + Sort -----
  function applyFilters(){
    let list = [...products];

    const cat = (filterCategory && filterCategory.value) || '';
    const wheel = (filterWheel && filterWheel.value) || '';
    const maxPrice = parseFloat((filterMaxPrice && filterMaxPrice.value) || '');

    if (cat) list = list.filter(p => p.category === cat);
    if (wheel) list = list.filter(p => p.wheel === wheel);
    if (!isNaN(maxPrice) && maxPrice > 0) list = list.filter(p => p.price <= maxPrice);

    const sort = (sortBy && sortBy.value) || 'featured';
    switch (sort){
      case 'price-asc': list.sort((a,b)=> a.price - b.price); break;
      case 'price-desc': list.sort((a,b)=> b.price - a.price); break;
      case 'weight-asc': list.sort((a,b)=> a.weight - b.weight); break;
      case 'weight-desc': list.sort((a,b)=> b.weight - a.weight); break;
      default: /* featured */ break;
    }

    render(list);
  }

  function clearFilters(){
    if (filterCategory) filterCategory.value = '';
    if (filterWheel) filterWheel.value = '';
    if (filterMaxPrice) filterMaxPrice.value = '';
    if (sortBy) sortBy.value = 'featured';
    render(products);
  }

  if (btnApply) btnApply.addEventListener('click', applyFilters);
  if (btnClear) btnClear.addEventListener('click', clearFilters);

  // Live filter on change for good UX
  [filterCategory, filterWheel, sortBy].forEach(el=>{
    if (el) el.addEventListener('change', applyFilters);
  });
  if (filterMaxPrice) filterMaxPrice.addEventListener('input', ()=>{
    // Debounce-ish feel
    clearTimeout(filterMaxPrice._t);
    filterMaxPrice._t = setTimeout(applyFilters, 250);
  });

  // ----- Cart -----
  function addToCart(id){
    const p = products.find(x=> x.id === id);
    if (!p) return;
    const cart = getCart();
    const idx = cart.findIndex(x=> x.id === id);
    if (idx >= 0) cart[idx].qty += 1;
    else cart.push({ id, qty: 1, price: p.price, name: `${p.brand} ${p.model}` });
    setCart(cart);
    updateCartCount();
    // minor feedback
    const el = document.querySelector(`button[data-id="${id}"]`);
    if (el){
      el.textContent = "Added ✓";
      setTimeout(()=> el.textContent = "Add to Cart", 1000);
    }
  }

  // Initial render
  render(products);
})();