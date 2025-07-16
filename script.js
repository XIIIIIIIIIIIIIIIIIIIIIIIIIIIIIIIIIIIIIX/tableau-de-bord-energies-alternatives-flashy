(()=>{
  const randomData = () =>
    Array.from({length:8},(_) => Math.random()*80+20);

  const colors = ['#00ffd5','#ff00ff','#adff2f','#ff8100'];
  const idList = ['solar','lunar','magic','ventus'];

  idList.forEach((id,i)=>{
    const card = document.getElementById(id);
    const graph = card.querySelector('.graph');
    const svgNS = "http://www.w3.org/2000/svg";
    const data = randomData();

    // Grid
    const grid = card.querySelector('.grid');
    const step = 30;
    new Array(3).fill(0).forEach((_,y)=>{
      const hLine = document.createElementNS(svgNS,'line');
      hLine.setAttribute('x1',0);
      hLine.setAttribute('y1',y*step+30);
      hLine.setAttribute('x2',250);
      hLine.setAttribute('y2',y*step+30);
      hLine.setAttribute('class','grid-line');
      grid.appendChild(hLine);
    });
    new Array(8).fill(0).forEach((_,x)=>{
      const vLine = document.createElementNS(svgNS,'line');
      vLine.setAttribute('x1',x*30+15);
      vLine.setAttribute('y1',0);
      vLine.setAttribute('x2',x*30+15);
      vLine.setAttribute('y2',120);
      vLine.setAttribute('class','grid-line');
      grid.appendChild(vLine);
    });

    // Line
    const polyline = graph.querySelector('.plot-line');
    let pts = data.map((v,j)=> [j*30+15, 120-v-20]).join(' ');
    polyline.setAttribute('points', pts);
    polyline.setAttribute('stroke', colors[i]);

    // Dot
    const dot = graph.querySelector('.plot-dot');
    const last = data.length-1;
    dot.setAttribute('cx', last*30+15);
    dot.setAttribute('cy', 120-data[last]-20);
    dot.setAttribute('fill', colors[i]);

    // Real-time animation
    setInterval(()=>{
      data.shift();
      data.push(Math.random()*80+20);
      pts = data.map((v,j)=> [j*30+15, 120-v-20]).join(' ');
      polyline.setAttribute('points', pts);
      dot.setAttribute('cx', last*30+15);
      dot.setAttribute('cy', 120-data[last]-20);
      // Smooth fade value change
      const valEl = card.querySelector('.value');
      valEl.style.opacity = 0.3;
      setTimeout(()=>{
        valEl.innerHTML = Math.round(data[data.length-1]*4) + ' <span class="unit">TWh</span>';
        valEl.style.opacity = 1;
      },250);
    },2800);
  });
})();