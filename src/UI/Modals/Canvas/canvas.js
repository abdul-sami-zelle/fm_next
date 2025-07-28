'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Canvas, FabricImage, Rect } from 'fabric';
import LayerList from './layerlist';
import { useCart } from "@/context/cartContext/cartContext";

const CanvasApp = ({ data }) => {

  const {
    addToCart0
  } = useCart();

  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Wall');
  const [paintedWallColor, setPaintedWallColor] = useState('#fff');
  const [isSectionalSelected, setIsSectionals] = useState(false);
  const [reclining, setReclining] = useState(false);
  const [isRecliningNonSectional, setRecliningNonSectional] = useState(false);
  const [selectedSofa, setSelectedSofa] = useState();
  const [tools, setTools] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [canvasElements, setCanvasElements] = useState({
    wall: null,
    floor: null,
    sofa: null,
    wallArt: null,
    centerTable: null,
    endTable: null,
    rug: null,
    lamp: null
  });
  const containerRef = useRef(null);
  const sofaRef = useRef(null);
  let lastSofaSrc = null;
  const baseURL = "https://roomapi.myfurnituremecca.com";

  // Handle container resize
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Apply zoom and adjust canvas size
  const applyZoom = (zoom) => {
    if (canvas) {
      canvas.setZoom(zoom);
      const canvasWidth = Math.min(containerSize.width * 0.7, 1200);
      const canvasHeight = Math.min(containerSize.height * 0.8, 800);
      canvas.setWidth(canvasWidth);
      canvas.setHeight(canvasHeight);
      canvas.renderAll();
    }
  };

  // Zoom handlers
  const handleZoomIn = () => {
    const newZoom = Math.min(zoomLevel + 0.1, 3);
    setZoomLevel(newZoom);
    applyZoom(newZoom);
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(zoomLevel - 0.1, 0.5);
    setZoomLevel(newZoom);
    applyZoom(newZoom);
  };

  const handleZoomReset = () => {
    setZoomLevel(1);
    applyZoom(1);
  };

  // Mouse wheel zoom with Ctrl key
  useEffect(() => {
    const handleWheel = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        const newZoom = Math.min(Math.max(zoomLevel + delta, 0.5), 3);
        setZoomLevel(newZoom);
        applyZoom(newZoom);
      }
    };

    const canvasElement = canvasRef.current;
    if (canvasElement) {
      canvasElement.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (canvasElement) {
        canvasElement.removeEventListener('wheel', handleWheel);
      }
    };
  }, [zoomLevel, canvas, containerSize]);

  useEffect(() => {
    getProducts();
  }, []);

  // Initialize empty canvas
  useEffect(() => {
    const initEmptyCanvas = () => {
      if (!canvasRef.current) return;

      // Dispose existing canvas if it exists
      if (canvas) {
        canvas.dispose();
      }

      const canvasWidth = Math.max(containerSize.width * 0.7, 800);
      const canvasHeight = Math.max(containerSize.height * 0.8, 600);

      const initCanvas = new Canvas(canvasRef.current, {
        width: canvasWidth,
        height: canvasHeight,
        backgroundColor: '#fff',
      });

      setCanvas(initCanvas);
      initCanvas.renderAll();
    };

    if (containerSize.width > 0) {
      initEmptyCanvas();
    }

    return () => {
      if (canvas) {
        canvas.dispose();
      }
    };
  }, [containerSize]);

  const getProducts = () => {
    fetch(`${baseURL}/api/v1/mega/get`)
      .then((res) => res.json())
      .then((res) => {
        const arr = res;
        const newSection = {
          section: "Product",
          items: [data]
        };
        arr.splice(4, 0, newSection);

        const updatedTools = arr.map(section => {
          if (section.section === "Wall") {
            return {
              ...section,
              items: section.items.map(item => ({
                ...item,
                onClick: 'addWall',
              }))
            };
          }
          if (section.section === "Floor") {
            return {
              ...section,
              items: section.items.map(item => ({
                ...item,
                onClick: 'addFloor',
              }))
            };
          }
          if (section.section === 'Product') {
            if (data.cat === 'SSofanlove') {
              return {
                ...section,
                items: section.items.map(item => ({
                  ...item,
                  onClick: 'addloveSeatImage',
                }))
              };
            } else if (data.cat === 'RSofanlove') {
              return {
                ...section,
                items: section.items.map(item => ({
                  ...item,
                  onClick: 'addSofaImage',
                }))
              };
            } else if (data.cat === 'RSectional') {
              return {
                ...section,
                items: section.items.map(item => ({
                  ...item,
                  onClick: 'addReclinerSofaImage',
                }))
              };
            } else if (data.cat === 'SSectional') {
              return {
                ...section,
                items: section.items.map(item => ({
                  ...item,
                  onClick: 'addSectionalImage',
                }))
              };
            }
          }
          if (section.section === "Wall Art") {
            return {
              ...section,
              items: section.items.map(item => ({
                ...item,
                onClick: 'addwallfram',
              }))
            };
          }
          if (section.section === "Coffee Tables") {
            return {
              ...section,
              items: section.items.map(item => ({
                ...item,
                onClick: 'addCenterTableImage',
              }))
            };
          }
          if (section.section === "End Tables") {
            return {
              ...section,
              items: section.items.map(item => ({
                ...item,
                onClick: 'addEndTableImage',
              }))
            };
          }
          if (section.section === "Rugs") {
            return {
              ...section,
              items: section.items.map(item => ({
                ...item,
                onClick: 'addRugImage',
              }))
            };
          }
          if (section.section === "Lamps & Lighting") {
            return {
              ...section,
              items: section.items.map(item => ({
                ...item,
                onClick: 'addLampImage',
              }))
            };
          }
          return section;
        });

        setTools(updatedTools);
      })
      .catch((error) => console.error("API error:", error));
  };

  const addImageToCanvas = async (src, config = {}, canvasOverride = null, elementType = null) => {
    const activeCanvas = canvasOverride || canvas;
    if (!activeCanvas) return null;

    try {
      // Remove previous element of this type if it exists
      if (elementType && canvasElements[elementType]) {
        activeCanvas.remove(canvasElements[elementType]);
        setCanvasElements(prev => ({ ...prev, [elementType]: null }));
      }

      const fullSrc = src.startsWith('http')
        ? src
        : `https://roomapi.myfurnituremecca.com${src}`;

      const img = await FabricImage.fromURL(fullSrc);
      const canvasWidth = activeCanvas.getWidth();
      const canvasHeight = activeCanvas.getHeight();

      const targetWidth = config.targetWidthRatio
        ? canvasWidth * config.targetWidthRatio
        : config.targetWidth ?? img.width;

      const targetHeight = config.targetHeightRatio
        ? canvasHeight * config.targetHeightRatio
        : config.targetHeight ?? img.height;

      const scaleX = targetWidth / img.width;
      const scaleY = targetHeight / img.height;

      img.set({
        left: config.left ?? (canvasWidth - targetWidth) / 2,
        top: config.top ?? (canvasHeight - targetHeight) / 2,
        scaleX,
        scaleY,
        selectable: config.selectable ?? true,
        evented: config.evented ?? true,
      });

      activeCanvas.add(img);
      activeCanvas.renderAll();

      // Update the element tracking if this is a tracked type
      if (elementType) {
        setCanvasElements(prev => ({ ...prev, [elementType]: img }));
      }

      return img;
    } catch (error) {
      console.error(`Failed to load image: ${src}`, error);
      return null;
    }
  };

  let paintedWallRef = null;

  const handlers = {
    addPaintedWall: () => {
      if (!canvas) return;

      // Remove previous wall if it exists
      if (canvasElements.wall) {
        canvas.remove(canvasElements.wall);
      }

      const wall = new Rect({
        left: 0,
        top: 0,
        width: canvas.getWidth(),
        height: canvas.getHeight() * 0.55,
        fill: paintedWallColor,
        selectable: false,
        evented: false,
        objectCaching: false,
      });

      paintedWallRef = wall;
      canvas.add(wall);
      setCanvasElements(prev => ({ ...prev, wall }));
      canvas.renderAll();
    },
    addWall: (src) => addImageToCanvas(src, {
      left: 0,
      top: 0,
      targetWidthRatio: 1,
      targetHeightRatio: 0.55,
      selectable: false,
      evented: false,
    }, null, 'wall'),

    addFloor: (src) => addImageToCanvas(src, {
      left: 0,
      top: canvas?.getHeight() * 0.55,
      targetWidthRatio: 1,
      targetHeightRatio: 0.45,
      selectable: false,
      evented: false,
    }, null, 'floor'),

    addSofaImage: (src) => {
      setRecliningNonSectional(true);
      setReclining(false);
      setIsSectionals(false);
      return addImageToCanvas(src, {
        left: canvas?.getWidth() * 0.10,
        top: canvas?.getHeight() * 0.27,
        targetWidthRatio: 0.77,
        targetHeightRatio: 0.55,
      }, null, 'sofa');
    },
    addSectionalImage: (src) => {
      setIsSectionals(true);
      return addImageToCanvas(src, {
        left: canvas?.getWidth() * 0.18,
        top: canvas?.getHeight() * 0.37,
        targetWidthRatio: 0.69,
        targetHeightRatio: 0.47,
      }, null, 'sofa');
    },
    addReclinerSofaImage: (src) => {
      setIsSectionals(false);
      setReclining(true);
      return addImageToCanvas(src, {
        left: canvas?.getWidth() * 0.07,
        top: canvas?.getHeight() * 0.28,
        targetWidthRatio: 0.87,
        targetHeightRatio: 0.57,
      }, null, 'sofa');
    },
    addloveSeatImage: (src) => addImageToCanvas(src, {
      left: canvas?.getWidth() * 0.10,
      top: canvas?.getHeight() * 0.25,
      targetWidthRatio: 0.77,
      targetHeightRatio: 0.62,
    }, null, 'sofa'),
    addwallfram: (src) => addImageToCanvas(src, {
      left: canvas?.getWidth() * 0.39,
      top: canvas?.getHeight() * 0.04,
      targetWidthRatio: 0.23,
      targetHeightRatio: 0.23,
    }, null, 'wallArt'),
    addCenterTableImage: (src) => {
      const canvasWidth = canvas?.getWidth() ?? 1000;
      const canvasHeight = canvas?.getHeight() ?? 600;

      let style;

      if (isSectionalSelected) {
        style = {
          left: canvasWidth * 0.20,
          top: canvasHeight * 0.52,
          targetWidthRatio: 0.40,
          targetHeightRatio: 0.4,
        };
      } else if (reclining) {
        style = {
          left: canvasWidth * 0.33,
          top: canvasHeight * 0.57,
          targetWidthRatio: 0.35,
          targetHeightRatio: 0.35,
        };
      } else if (isRecliningNonSectional) {
        style = {
          left: canvasWidth * 0.35,
          top: canvasHeight * 0.55,
          targetWidthRatio: 0.35,
          targetHeightRatio: 0.32,
        };
      } else {
        style = {
          left: canvasWidth * 0.35,
          top: canvasHeight * 0.52,
          targetWidthRatio: 0.35,
          targetHeightRatio: 0.40,
        };
      }

      return addImageToCanvas(src, style, null, 'centerTable');
    },
    addHadaskyCoffeetable: (src) => addImageToCanvas(src, {
      left: canvas?.getWidth() * 0.22,
      top: canvas?.getHeight() * 0.46,
      targetWidthRatio: 0.55,
      targetHeightRatio: 0.35,
    }, null, 'centerTable'),
    addFLEMINGCOFFEETABLE: (src) => addImageToCanvas(src, {
      left: canvas?.getWidth() * 0.28,
      top: canvas?.getHeight() * 0.43,
      targetWidthRatio: 0.42,
      targetHeightRatio: 0.43,
    }, null, 'centerTable'),
    addRugImage: (src) => addImageToCanvas(src, {
      left: canvas?.getWidth() * 0.03,
      top: reclining ? canvas?.getHeight() * 0.70 : canvas?.getHeight() * 0.65,
      targetWidthRatio: 0.93,
      targetHeightRatio: 0.32,
    }, null, 'rug'),
    addLampImage: (src) => {
      const canvasWidth = canvas?.getWidth() ?? 1000;
      const canvasHeight = canvas?.getHeight() ?? 600;

      let style;

      if (isSectionalSelected) {
        style = {
          left: canvasWidth * 0.07,
          top: canvasHeight * 0.16,
          targetWidthRatio: 0.12,
          targetHeightRatio: 0.29,
        };
      } else if (isRecliningNonSectional) {
        style = {
          left: canvasWidth * 0.85,
          top: canvasHeight * 0.31,
          targetWidthRatio: 0.10,
          targetHeightRatio: 0.25,
        };
      } else if (reclining) {
        style = {
          left: canvasWidth * 0.87,
          top: canvasHeight * 0.33,
          targetWidthRatio: 0.10,
          targetHeightRatio: 0.25,
        };
      } else {
        style = {
          left: canvasWidth * 0.87,
          top: canvasHeight * 0.28,
          targetWidthRatio: 0.10,
          targetHeightRatio: 0.25,
        };
      }

      return addImageToCanvas(src, style, null, 'lamp');
    },
    addSmailLampImage: (src) => {
      const canvasWidth = canvas?.getWidth() ?? 1000;
      const canvasHeight = canvas?.getHeight() ?? 600;

      let style;

      if (isSectionalSelected) {
        style = {
          left: canvasWidth * 0.01,
          top: canvasHeight * 0.21,
          targetWidthRatio: 0.32,
          targetHeightRatio: 0.30,
        };
      } else if (reclining) {
        style = {
          left: canvasWidth * 0.76,
          top: canvasHeight * 0.33,
          targetWidthRatio: 0.32,
          targetHeightRatio: 0.28,
        };
      } else if (isRecliningNonSectional) {
        style = {
          left: canvasWidth * 0.74,
          top: canvasHeight * 0.31,
          targetWidthRatio: 0.32,
          targetHeightRatio: 0.30,
        };
      } else {
        style = {
          left: canvasWidth * 0.78,
          top: canvasHeight * 0.27,
          targetWidthRatio: 0.32,
          targetHeightRatio: 0.32,
        };
      }

      return addImageToCanvas(src, style, null, 'lamp');
    },
    addFloorLampImage: (src) => addImageToCanvas(src, {
      left: isSectionalSelected ? canvas?.getWidth() * 0.82 : canvas?.getWidth() * -0.01,
      top: isSectionalSelected ? canvas?.getHeight() * 0.09 : canvas?.getHeight() * 0.18,
      targetWidthRatio: isSectionalSelected ? 0.18 : 0.15,
      targetHeightRatio: isSectionalSelected ? 0.65 : 0.60,
    }, null, 'lamp'),
    addEndTableImage: (src) => {
      const canvasWidth = canvas?.getWidth() ?? 1000;
      const canvasHeight = canvas?.getHeight() ?? 600;

      let style;

      if (isSectionalSelected) {
        style = {
          left: canvasWidth * 0.02,
          top: canvasHeight * 0.41,
          targetWidthRatio: 0.2,
          targetHeightRatio: 0.3,
        };
      } else if (reclining) {
        style = {
          left: canvasWidth * 0.83,
          top: canvasHeight * 0.53,
          targetWidthRatio: 0.17,
          targetHeightRatio: 0.32,
        };
      } else if (isRecliningNonSectional) {
        style = {
          left: canvasWidth * 0.80,
          top: canvasHeight * 0.52,
          targetWidthRatio: 0.19,
          targetHeightRatio: 0.27,
        };
      } else {
        style = {
          left: canvasWidth * 0.83,
          top: canvasHeight * 0.47,
          targetWidthRatio: 0.22,
          targetHeightRatio: 0.30,
        };
      }

      return addImageToCanvas(src, style, null, 'endTable');
    }
  };


  const handleCheckout = async (items) => {
    console.log("✅ Adding multiple items to cart...", items);

    // for (const product of items) {
    //   const isSimple = product.type === "simple";
    //   const variationData = isSimple ? null : null; // Placeholder if you add variations later
    //   const isProtected = product?.is_protected || 0;
    //   const quantity = product?.quantity || 1;

    //   try {
    //     await addToCart0(product, variationData, isProtected, quantity);
    //     console.log(`✅ Added to cart: ${product.name}`);
    //   } catch (error) {
    //     console.error(`❌ Failed to add: ${product.name}`, error);
    //   }
    // }

    // console.log("✅ All items processed");
  };


  return (
    <div
      ref={containerRef}
      className="editor-container"
      style={{
        display: 'flex',
        alignSelf: 'center',
        flexDirection: 'row',
        height: '90vh',
        width: '95vw',
        overflow: 'hidden',
        // position: 'fixed',
        // top: 0,
        // left: 0
      }}
    >
      {/* Toolbar - Fixed width, scrollable content */}
      <div style={{
        width: '250px',
        minWidth: '250px',
        padding: '12px',
        backgroundColor: '#f8f8f8',
        borderRight: '1px solid #e0e0e0',
        overflowY: 'auto',
        height: '100%',
        boxSizing: 'border-box'
      }}>
        {/* Zoom controls */}
        {/* <div style={{
          display: 'flex',
          gap: '6px',
          marginBottom: '12px',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <button onClick={handleZoomOut} style={{
            padding: '4px 8px',
            backgroundColor: '#e0e0e0',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>-</button>
          <span style={{ fontSize: '0.8rem' }}>{Math.round(zoomLevel * 100)}%</span>
          <button onClick={handleZoomIn} style={{
            padding: '4px 8px',
            backgroundColor: '#e0e0e0',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>+</button>
          <button onClick={handleZoomReset} style={{
            padding: '4px 8px',
            backgroundColor: '#e0e0e0',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.7rem'
          }}>Reset</button>
        </div> */}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {tools?.map((toolSection) => (
            <button
              key={toolSection.section}
              onClick={() => {
                setActiveCategory(toolSection.section);

                // Clear canvas based on selected section
                if (canvas) {
                  // Get all objects from canvas
                  const objects = canvas.getObjects();

                  // Filter objects to keep based on section
                  const objectsToRemove = objects.filter(obj => {
                    // Always keep walls
                    if (obj === canvasElements.wall) return false;

                    switch (toolSection.section) {
                      case 'Wall':
                        // Keep only wall and wall art
                        return obj !== canvasElements.wall

                      case 'Floor':
                        // Keep wall, floor, and wall art
                        return obj !== canvasElements.wall &&
                          obj !== canvasElements.floor;

                      case 'Rugs':
                        // Keep wall, floor, wall art, and rug
                        return obj !== canvasElements.wall &&
                          obj !== canvasElements.floor &&
                          obj !== canvasElements.wallArt &&
                          obj !== canvasElements.rug;

                      case 'Product':
                        // Keep wall, floor, wall art, rug, and product (sofa)
                        return obj !== canvasElements.wall &&
                          obj !== canvasElements.floor &&
                          obj !== canvasElements.wallArt &&
                          obj !== canvasElements.rug &&
                          obj !== canvasElements.sofa;

                      case 'Coffee Tables':
                        // Keep wall, floor, wall art, rug, product, and coffee tables
                        return obj !== canvasElements.wall &&
                          obj !== canvasElements.floor &&
                          obj !== canvasElements.wallArt &&
                          obj !== canvasElements.rug &&
                          obj !== canvasElements.sofa &&
                          obj !== canvasElements.centerTable;

                      case 'End Tables':
                        // Keep wall, floor, wall art, rug, product, coffee tables, and end tables
                        return obj !== canvasElements.wall &&
                          obj !== canvasElements.floor &&
                          obj !== canvasElements.wallArt &&
                          obj !== canvasElements.rug &&
                          obj !== canvasElements.sofa &&
                          obj !== canvasElements.centerTable &&
                          obj !== canvasElements.endTable;

                      default:
                        // For other sections, keep everything
                        return false;
                    }
                  });

                  // Remove filtered objects
                  objectsToRemove.forEach(obj => canvas.remove(obj));
                  canvas.renderAll();
                }
              }}
              style={{
                padding: '6px 10px',
                fontSize: '0.9rem',
                borderRadius: '8px',
                border: '1px solid #ccc',
                outline: 'none',
                width: '100%',
                textAlign: 'left',
                backgroundColor: activeCategory === toolSection.section ? '#f0f0f0' : 'white',
                cursor: 'pointer',
              }}
            >
              {toolSection.section}
            </button>
          ))}
        </div>
        {/* Items grid */}
        <div style={{ marginTop: '12px', borderTop: '1px solid #eee', paddingTop: '12px' }}>
          <h4 style={{
            fontSize: '0.9rem',
            marginBottom: '10px',
            color: '#555',
            fontWeight: '600'
          }}>
            {activeCategory}
          </h4>
          <div style={{
            display: 'grid',
            gap: '5px',
          }}>
            {tools
              ?.find(section => section.section === activeCategory)
              ?.items.map((item) => (
                <div key={item.name} style={{
                  textAlign: 'center',
                  cursor: 'pointer',
                  ':hover': {
                    transform: 'scale(1.05)'
                  }
                }}>
                  <button
                    onClick={() => {
                      if (item.name === 'Painted Wall') {
                        document.getElementById('wallColorPickerHidden').click();
                      } else {
                        handlers[item.onClick]?.(item.price === 'Not Applicable' ? item.image : item.png_image);
                      }
                    }}
                    style={{
                      width: '150px',
                      backgroundColor: item.name === 'Painted Wall' ? paintedWallColor : 'transparent',
                      borderRadius: '4px',
                      border: '1px solid #000',
                      cursor: 'pointer'
                    }}
                  >
                    {item.name === 'Painted Wall' ? null : (
                      <img
                        src={item.png_image ? `${baseURL}${item.png_image}` : `${baseURL}${item.image}`}
                        alt={item.name}
                        style={{
                          width: '150px',
                          height: item.price === 'Not Aplicable' ? '150px' : '100px',
                          borderRadius: '4px',
                        }}
                      />
                    )}
                  </button>
                  <div style={{
                    fontSize: '0.7rem',
                    marginTop: '4px',
                    color: '#666',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    width: '150px',
                    display: 'flex',
                    alignSelf: 'center',
                    marginLeft: '40px'
                  }}>
                    {item.name}
                  </div>
                  {item.price === 'Not Aplicable' ? null : (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginLeft: '40px',
                      gap: '4px',
                      marginBottom: '4px'
                    }}>
                      {item.sale_price && item.sale_price !== item.regular_price ? (
                        <>
                          <span style={{
                            fontSize: '0.8rem',
                            color: '#2c3e50',
                            fontWeight: '800'
                          }}>
                            ${item.sale_price}
                          </span>
                          <span style={{
                            fontSize: '0.6rem',
                            color: '#999',
                            textDecoration: 'line-through',
                            fontWeight: '400'
                          }}>
                            ${item.regular_price}
                          </span>
                        </>
                      ) : (
                        <span style={{
                          fontSize: '0.7rem',
                          color: '#2c3e50',
                          fontWeight: '600'
                        }}>
                          ${item.regular_price}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Canvas area - Flexible width */}
      <div style={{
        // flex: 1,
        // padding: '12px',
        // overflow: 'auto',
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
        // height: '100%',
        // boxSizing: 'border-box'
      }}>
        <canvas
          ref={canvasRef}
          style={{
            border: '1px solid #e0e0e0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            maxWidth: '100%',
            maxHeight: '100%'
          }}
        />
      </div>

      <input
        type="color"
        id="wallColorPickerHidden"
        value={paintedWallColor}
        style={{ display: 'none' }}
        onChange={(e) => {
          const newColor = e.target.value;
          setPaintedWallColor(newColor);
          handlers.addPaintedWall();
        }}
      />

      <LayerList canvas={canvas} tools={tools} onCheckout={handleCheckout} selectedSofa={selectedSofa} />
    </div>
  );
};

export default CanvasApp;