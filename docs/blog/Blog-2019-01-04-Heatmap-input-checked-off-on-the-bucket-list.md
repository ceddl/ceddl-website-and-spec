Heatmap data input has been on the team bucket list from day one. We found that heatmap coordinates data collection is not as simple a adding a mouse move listener on the body. There are lots of situations and exceptions to handle:

* Is the user using a mouse?
* When should we send data to the eventbus (backend).
* How to handle users leaving or closing the browser window.
* Separating click for touch devices and mouse move heatmap.
* Users mouse idle time.

<p><img src="/img/heatmap.png" alt="ceddl stickers image"></p>

To run the demo application clone the <a href="https://github.com/ceddl/ceddl-aditional-inputs">ceddl-aditional-inputs git repository</a> and run commands `npm install` and `npm run dev`.

Loving that it can be done in under 175 lines of JavaScript. Happy to be able to release heatmap data input for web analytics early in 2019.
