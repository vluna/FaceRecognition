Welcome to the SIAT Intelligence System.
by
Marya Smirnova & Victor Luna
Final Project IAT455
Our topic for this project is Video Tracking. We created an application that allows the user to compare their face similarity with another person of their choice. We used an already built face tracking library called clmtrackr and extended its features for face tracking. This is a  javascript library for fitting facial models to faces in videos or images. It currently is an implementation of constrained local models fitted by regularized landmark mean-shift. clmtrackr tracks a face and outputs the coordinate positions of the face model as an array. 
We implemented an algorithm that takes particular coordinate positions and uses them to calculate facial proportions, such as the distance between eyes, width and height of the face, distance between eyebrows etc. Essentially, what the system does is determines your distances between important features and the distances between the same facial features in the loaded image and then compares difference between the two. For example, it takes the distance between your eyes and the other person's eyes and compares the difference between the two. The larger the difference, the less similar you are. It compares a multiple of distances, adds the values, scales them and returns the result in percentage. 
Issues & Solutions: 
In order for it to work properly, the user has to position their head in the rectangle region. If they move forward or backwards, the calculations will be off. One of the possible ways we think can work to fix this is by allowing the user to take snapshots of themselves. Everytime they take a snapshot, the calculated percentage is saved into an array. Only when they click on the button to get the result, the final percentage is equal to the average of all of the saved percentages. This deals with the differences of results when the subject moves closer or farther away from the camera and creates a threshold of possible values. We tried to implement this but something definitely was wrong and the final value kept increasing. 
Another issue is with uploading images from the internet. Not all images work because of privacy permissions and the type of images. This is out of our scope for this project and we decided not to focus on it too much. We originally wanted to have a drop down menu of images users can compare themselves to, but we wanted to give the users the freedom of choice. 
We compared the runtimes and the efficiency of the algorithms and how it will work with video and images. The video is in constant motion, therefore the running time of the implemented algorithm is O(n). The image doesn’t move, therefore, it is faster and easier to find the facial features, so the running time is O(nlogn). In our earlier versions, the application drew a rectangle that tracks the face as a whole, and only then the clmtrackr was implemented to draw the eyes, nose, mouth, etc. The program ran in O(n)2, and in order to optimize the application we got rid of the square and to make it run in constant time. 
In our current version, the start tracking function enables the face recognition function, and when the GetResult button is clicked, it pauses the video and calculates the result by getting the distances. This is a better way to get the result because the video is paused and the values are not affected by the motion. 
Overall we feel like this project met the requirements. We took something thats already been done and modified it to make our idea work. We tried many ways of doing it (modifying parameters, creating thresholds, using various inputs). After the presentation, we decided to code the program from scratch after a problem with the camera. It kept freezing and we could not figure it out how to fix it. This helped us to make the UI better, and manage our time. 
Resources: 
Articles
http://www4.comp.polyu.edu.hk/~cslzhang/CT/CT.htm
http://ieeexplore.ieee.org/xpls/icp.jsp?arnumber=1510632
http://www.purplemath.com/modules/distform.htm
 http://faint.sourceforge.net/#mozTocId22682

Videos
https://www.youtube.com/watch?v=AxmQtqA0h34
https://www.youtube.com/watch?v=3Z83kY0dbSo
https://www.youtube.com/watch?v=ItssLfIGZYM

Examples
http://auduno.github.io/clmtrackr/clm_image.html
http://auduno.github.io/clmtrackr/clm_video.html

Examples
https://github.com/auduno/clmtrackr

