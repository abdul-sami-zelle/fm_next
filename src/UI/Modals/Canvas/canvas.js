'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Canvas, FabricImage, Rect } from 'fabric';
import LayerList from './layerlist';

const CanvasApp = ({ data }) => {
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
      const canvasWidth = Math.min(containerSize.width * 0.7, 1200); // Limit max width
      const canvasHeight = Math.min(containerSize.height * 0.8, 800); // Limit max height
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
    getProducts()
  }, [])

  useEffect(() => {
    const loadInitialImages = async () => {
      if (canvasRef.current && containerSize.width > 0) {
        const initCanvas = new Canvas(canvasRef.current, {
          width: containerSize.width * 0.7,
          height: containerSize.height * 0.8,
          backgroundColor: '#fff',
        });

        const wallSrc = `${baseURL}/uploads/Products/1753184712785_429_06.png`;
        const floorSrc = `${baseURL}/uploads/Products/1751612646817_958_04.jpg`;
        const sofaSrc = data.png_image;

        setSelectedSofa(data)

        await addImageToCanvas(wallSrc, {
          left: 0,
          top: 0,
          targetWidthRatio: 1,
          targetHeightRatio: 0.55,
          selectable: false,
          evented: false,
        }, initCanvas);

        await addImageToCanvas(floorSrc, {
          left: 0,
          top: initCanvas.getHeight() * 0.55,
          targetWidthRatio: 1,
          targetHeightRatio: 0.45,
          selectable: false,
          evented: false,
        }, initCanvas);

        if (data.cat == 'SSectional') {
          const sofa = await addImageToCanvas(sofaSrc, {
            left: initCanvas.getWidth() * 0.18,
            top: initCanvas.getHeight() * 0.37,
            targetWidthRatio: 0.69,
            targetHeightRatio: 0.47,
          }, initCanvas)

          if (sofa) {
            setIsSectionals(true)
            initCanvas.remove(sofa);
            initCanvas.add(sofa);
            sofaRef.current = sofa;
          }
        }
        else if (data.cat == 'RSectional') {
          const sofa = await addImageToCanvas(sofaSrc, {
            left: initCanvas.getWidth() * 0.12,
            top: initCanvas.getHeight() * 0.37,
            targetWidthRatio: 0.77,
            targetHeightRatio: 0.40,
          }, initCanvas)

          if (sofa) {
            setReclining(true)
            initCanvas.remove(sofa);
            initCanvas.add(sofa);
            sofaRef.current = sofa;
          }
        }
        else if (data.cat == 'RSofanlove') {
          const sofa = await addImageToCanvas(sofaSrc, {
            left: initCanvas.getWidth() * 0.10,
            top: initCanvas.getHeight() * 0.31,
            targetWidthRatio: 0.77,
            targetHeightRatio: 0.47,
          }, initCanvas)

          if (sofa) {
            setRecliningNonSectional(true)
            setReclining(false)
            setIsSectionals(false)
            initCanvas.remove(sofa);
            initCanvas.add(sofa);
            sofaRef.current = sofa;
          }
        }
        else {
          const sofa = await addImageToCanvas(sofaSrc, {
            left: initCanvas.getWidth() * 0.10,
            top: initCanvas.getHeight() * 0.22,
            targetWidthRatio: 0.77,
            targetHeightRatio: 0.62,
          }, initCanvas)

          if (sofa) {
            initCanvas.remove(sofa);
            initCanvas.add(sofa);
            sofaRef.current = sofa;
          }
        }

        initCanvas.renderAll();
        setCanvas(initCanvas);
      }
    };

    loadInitialImages();
  }, [containerSize, data]);

  const getProducts = () => {
    fetch(`${baseURL}/api/v1/mega/get`)
      .then((res) => res.json())
      .then((data) => {
        const updatedTools = data.map(section => {
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

  const addImageToCanvas = async (src, config = {}, canvasOverride = null) => {
    const activeCanvas = canvasOverride || canvas;
    if (!activeCanvas) return null;

    try {
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
      canvas.renderAll();
    },
    addWall: (src) => addImageToCanvas(src, {
      left: 0,
      top: 0,
      targetWidthRatio: 1,
      targetHeightRatio: 0.55,
      selectable: false,
      evented: false,
    }),

    addFloor: (src) => {
      addImageToCanvas(src, {
        left: 0,
        top: canvas?.getHeight() * 0.55,
        targetWidthRatio: 1,
        targetHeightRatio: 0.45,
        selectable: false,
        evented: false,
      })
    },

    addSofaImage: (src) => {
      setRecliningNonSectional(true);
      setReclining(false)
      setIsSectionals(false)
      addImageToCanvas(src, {
        left: canvas?.getWidth() * 0.10,
        top: canvas?.getHeight() * 0.31,
        targetWidthRatio: 0.77,
        targetHeightRatio: 0.47,
      })
    },
    addSectionalImage: (src) => {
      setIsSectionals(true);
      addImageToCanvas(src, {
        left: canvas?.getWidth() * 0.18,
        top: canvas?.getHeight() * 0.37,
        targetWidthRatio: 0.69,
        targetHeightRatio: 0.47,
      })
    },

    addReclinerSofaImage: (src) => {
      setIsSectionals(false);
      setReclining(true);
      addImageToCanvas(src, {
        left: canvas?.getWidth() * 0.12,
        top: canvas?.getHeight() * 0.37,
        targetWidthRatio: 0.77,
        targetHeightRatio: 0.40,
      })
    },
    addloveSeatImage: (src) => addImageToCanvas(src, {
      left: canvas?.getWidth() * 0.10,
      top: canvas?.getHeight() * 0.22,
      targetWidthRatio: 0.77,
      targetHeightRatio: 0.62,
    }),
    addwallfram: (src) => {
      const canvasWidth = canvas?.getWidth() ?? 1000;
      const canvasHeight = canvas?.getHeight() ?? 600;

      addImageToCanvas(src, {
        left: canvasWidth * 0.39,
        top: canvasHeight * 0.04,
        targetWidthRatio: 0.23,
        targetHeightRatio: 0.23,
      });
    },
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
      }
      else if (reclining) {
        style = {
          left: canvasWidth * 0.33,
          top: canvasHeight * 0.57,
          targetWidthRatio: 0.35,
          targetHeightRatio: 0.35,
        };
      }
      else if (isRecliningNonSectional) {
        style = {
          left: canvasWidth * 0.35,
          top: canvasHeight * 0.55,
          targetWidthRatio: 0.35,
          targetHeightRatio: 0.32,
        };
      }
      else {
        style = {
          left: canvasWidth * 0.35,
          top: canvasHeight * 0.52,
          targetWidthRatio: 0.35,
          targetHeightRatio: 0.40,
        };
      }

      addImageToCanvas(src, style);
    },
    addHadaskyCoffeetable: (src) => {
      const canvasWidth = canvas?.getWidth() ?? 1000;
      const canvasHeight = canvas?.getHeight() ?? 600;

      addImageToCanvas(src, {
        left: canvasWidth * 0.22,
        top: canvasHeight * 0.46,
        targetWidthRatio: 0.55,
        targetHeightRatio: 0.35,
      });
    },

    addFLEMINGCOFFEETABLE: (src) => {
      const canvasWidth = canvas?.getWidth() ?? 1000;
      const canvasHeight = canvas?.getHeight() ?? 600;

      addImageToCanvas(src, {
        left: canvasWidth * 0.28,
        top: canvasHeight * 0.43,
        targetWidthRatio: 0.42,
        targetHeightRatio: 0.43,
      });
    },

    addRugImage: async (src) => {
      const canvasWidth = canvas?.getWidth() ?? 1000;
      const canvasHeight = canvas?.getHeight() ?? 600;

      let style = {
        left: canvasWidth * 0.03,
        top: canvasHeight * 0.65,
        targetWidthRatio: 0.93,
        targetHeightRatio: 0.32,
      };

      if (reclining) {
        style.top = canvasHeight * 0.70;
      }

      const sofa = sofaRef.current;
      if (sofa && canvas) {
        canvas.remove(sofa);
      }

      await addImageToCanvas(src, style);

      if (sofa && canvas) {
        canvas.add(sofa);
        sofa.moveTo(Infinity);
        canvas.requestRenderAll();
      }

      addImageToCanvas(src, style).then(() => {
        if (lastSofaSrc) {
          handlers.addSofaImage(lastSofaSrc);
        }
      });
    },
    addLampImage: (src) => {
      const canvasWidth = canvas?.getWidth() ?? 1000;
      const canvasHeight = canvas?.getHeight() ?? 600;

      let style;

      if (isSectionalSelected) {
        style = {
          left: canvasWidth * 0.07,
          top: canvasHeight * 0.20,
          targetWidthRatio: 0.12,
          targetHeightRatio: 0.29,
        };
      }
      else if (isRecliningNonSectional) {
        style = {
          left: canvasWidth * 0.85,
          top: canvasHeight * 0.33,
          targetWidthRatio: 0.10,
          targetHeightRatio: 0.25,
        };
      }
      else if (reclining) {
        style = {
          left: canvasWidth * 0.87,
          top: canvasHeight * 0.33,
          targetWidthRatio: 0.10,
          targetHeightRatio: 0.25,
        };
      }
      else {
        style = {
          left: canvasWidth * 0.87,
          top: canvasHeight * 0.28,
          targetWidthRatio: 0.10,
          targetHeightRatio: 0.25,
        };
      }

      addImageToCanvas(src, style);
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
      }
      else if (reclining) {
        style = {
          left: canvasWidth * 0.76,
          top: canvasHeight * 0.33,
          targetWidthRatio: 0.32,
          targetHeightRatio: 0.28,
        };
      }
      else if (isRecliningNonSectional) {
        style = {
          left: canvasWidth * 0.74,
          top: canvasHeight * 0.31,
          targetWidthRatio: 0.32,
          targetHeightRatio: 0.30,
        };
      }
      else {
        style = {
          left: canvasWidth * 0.78,
          top: canvasHeight * 0.27,
          targetWidthRatio: 0.32,
          targetHeightRatio: 0.32,
        };
      }

      addImageToCanvas(src, style);
    },

    addFloorLampImage: (src) => {
      const canvasWidth = canvas?.getWidth() ?? 1000;
      const canvasHeight = canvas?.getHeight() ?? 600;

      let style;

      if (isSectionalSelected) {
        style = {
          left: canvasWidth * 0.82,
          top: canvasHeight * 0.09,
          targetWidthRatio: 0.18,
          targetHeightRatio: 0.65,
        };
      } else {
        style = {
          left: canvasWidth * -0.01,
          top: canvasHeight * 0.18,
          targetWidthRatio: 0.15,
          targetHeightRatio: 0.60,
        };
      }

      addImageToCanvas(src, style);
    },

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
      }
      else if (reclining) {
        style = {
          left: canvasWidth * 0.83,
          top: canvasHeight * 0.53,
          targetWidthRatio: 0.17,
          targetHeightRatio: 0.32,
        };
      }
      else if (isRecliningNonSectional) {
        style = {
          left: canvasWidth * 0.80,
          top: canvasHeight * 0.53,
          targetWidthRatio: 0.19,
          targetHeightRatio: 0.35,
        };
      }
      else {
        style = {
          left: canvasWidth * 0.82,
          top: canvasHeight * 0.47,
          targetWidthRatio: 0.22,
          targetHeightRatio: 0.36,
        };
      }

      addImageToCanvas(src, style);
    }
  };

  const handleCheckout = (items) => {
    console.log("Complete checkout items:", items);
  };

  return (
    <div 
      ref={containerRef}
      className="editor-container" 
      style={{ 
        display: 'flex',
        flexDirection: 'row',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0
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
        <div style={{
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
        </div>

        <div>
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            style={{
              padding: '6px 10px',
              fontSize: '0.9rem',
              borderRadius: '8px',
              marginBottom: '10px',
              border: '1px solid #ccc',
              outline: 'none',
              width: '100%',
            }}
          >
            {tools?.map((toolSection) => (
              <option key={toolSection.section} value={toolSection.section}>
                {toolSection.section}
              </option>
            ))}
          </select>
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
                      // height: '150px',
                      backgroundColor: item.name === 'Painted Wall' ? paintedWallColor : 'transparent',
                      borderRadius: '4px',
                      border: '1px solid #000',
                      cursor: 'pointer'
                    }}
                  >
                    {item.name === 'Painted Wall' ? null
                      :
                      <img
                        src={item.png_image ? `${baseURL}${item.png_image}` : `${baseURL}${item.image}`}
                        alt={item.name}
                        style={{
                          width: '150px',
                          height: item.price === 'Not Aplicable' ? '150px' : '100px',
                          // objectFit:'fill',
                          // objectFit: item?.type && item.type == 'lamp' ? 'contain' : 'fill',
                          borderRadius: '4px',
                        }}
                      />
                    }
                  </button>
                  <div style={{
                    fontSize: '0.7rem',
                    marginTop: '4px',
                    color: '#666',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    width:'150px',
                    display:'flex',
                    alignSelf:'center',
                    marginLeft:'40px'
                  }}>
                    {item.name}
                  </div>
                  {item.price === 'Not Aplicable' ? null :
                    <div style={{
                      fontSize: '0.7rem',
                      color: '#2c3e50',
                      fontWeight: '600'
                    }}>
                      ${item.price ? item.price : item.sale_price}
                    </div>
                  }
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Canvas area - Flexible width */}
      <div style={{
        flex: 1,
        padding: '12px',
        overflow: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        boxSizing: 'border-box'
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
      
      <LayerList canvas={canvas} tools={tools} onCheckout={handleCheckout} selectedSofa={selectedSofa}/>
    </div>
  );
};

export default CanvasApp;


