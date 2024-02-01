import styles from './Styles.module.css';

import {useParams} from 'react-router-dom';
import { useEffect, useState } from "react";
import { CircularProgress } from "@material-ui/core";

import { Block } from './gridInterface';
import { data } from './__mock__/grid.mocks.data';
import { Header } from './components/Header/Header';
import { InfoPanel } from './components/InfoPanel/InfoPanel';
import { ImageGrid } from './components/ImageGrid/ImageGrid';

export const App = () => {
  const { id } = useParams() as { id: string };
  // State variables
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageData, setImageData] = useState<Partial<Block>[]>([]);
  const [selectedImage, setSelectedImage] = useState<Partial<Block>>({});

  // UseEffect hooks
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    /**
     * Loading proper infoPanel data when image is selected or url is changed
     */
    imageSelection(id);
  },[id, imageData]);

  // API Methods
  const getData = async () => {
    try {
      setIsLoading(true);
      const data = await getGridData();
      getImagesList(data);
    } catch (error) {
      console.error(error, 'error');
    } finally {
      setIsLoading(false);
    }
  }

  //helper functions

  const getGridData = () =>
    new Promise<Block>((res) => setTimeout(() => res(data), 500));

  /**
   * Get all images from the API response
   * @param dataObject <Block>
   **/
  const getImagesList = (dataObject: Block) => {
    const { children} = dataObject;
    if (!children?.length) return;
    const imageList = mapChildrenList(children, []);
    setImageData(imageList);
  }

  /**
   * Recursively map children list to get all images
   * @param items <Block[]>
   * @param list <Partial<Block>[]>
   **/
  const mapChildrenList = (items: Block[], list: Partial<Block>[]) => {
    items.forEach(({id, type, options, children, data}) => {
      if (type === "Image") {
        list.push({
          id,
          options,
          data
        })
      }
      if (type === "Column" && children?.length) {
        mapChildrenList(children, list);
      }
    });
    return list;
  }

  /**
   * Get image dimensions
   */
  const getDimension = () => {
    if (!selectedImage?.data?.width || !selectedImage?.data?.height) return "";
    const { width, height } = selectedImage?.data;

    return `${width} ${String.fromCharCode(120)} ${height}`;
  }

  /**
   * Get selected image information for InfoPanel
   * @param id <string>
   */
  const imageSelection = (id: string) => {
    const newSelectedItem = imageData.find((item) => item.id === id) || {};
    setSelectedImage(newSelectedItem);
  }

  const getSelectedImageFormattedDate = () => {
    if (!selectedImage?.data?.createdAt) return "";
    return formatDate(selectedImage.data.createdAt);
  }

  /**
   * Format date to show in InfoPanel
   * @param dateString
   */
  const formatDate = (dateString: string) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };

    return new Date(dateString).toLocaleDateString('en', options as any);
  }

  return (
    <>
      <Header />
      <main className={styles.main} data-testid="main">
        <div className={styles.wrapper}>
          { !!imageData.length &&
            <ImageGrid data={imageData} />
          }
          { !imageData.length && !isLoading &&
              <div>No data</div>
          }
          { isLoading && <CircularProgress className={styles.loader} data-testid='preloader' /> }
        </div>
        <InfoPanel
          id={selectedImage?.id}
          description={selectedImage?.data?.description}
          dimensions={getDimension()}
          createdAt={getSelectedImageFormattedDate()}
        />
      </main>
    </>
  );
};
