# Fundamentals of Web Performance Demo Website

<p align="center">
  <img src="https://raw.githubusercontent.com/toddhgardner/perf-training-website/main/slide_title.png" width="480">
  <br />
</p>

This is example website for Todd Gardner's "Fundamentals of Web Performance" workshop. You can find he workshop online at [Frontend Masters](https://frontendmasters.com/courses/web-perf/). It is intended to illustrate common and effective techniques to improve the performance of a website. It is not meant to be used in production.

## How to use

```
npm install
npm start
```

Open a browser at [http://localhost:3000/](http://localhost:3000/) to view the website.

## Related Resources:

- [Slides and Materials](https://drive.google.com/drive/folders/13sdKqO8O2L1yr6th9HgPwpncZwTpEPGl?usp=sharing)

## NOTES

<b>CDN</b> => Content Distribution Network. Used to cache and deliver file content to users so that the data doesn't have to travel so much distance, decreasing the time that files take to be served to the client.

<b>LCS</b> => Largest Contentful Paint. Time until the user sees most of the page and believes it is (almost) ready.

<b>FCP</b> => First Contentful Paint. Time that takes to load the first element that gives a hint that the page is loading.

<b>CLS</b> => Cumulative Layout Shift. Total amount of element shifting during the session.

<b>FID</b> => First Input Delay. Time that takes to start processing the first input that the user gives the page.