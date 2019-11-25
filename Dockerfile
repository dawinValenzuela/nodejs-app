# Use a lighter version of Node as a parent image
FROM node:10
# Set the working directory to /api
WORKDIR /reddit-server
# copy package.json into the container at /api
COPY package*.json /reddit-server/
# install dependencies
RUN npm install
# Copy the current directory contents into the container at /api
COPY . /reddit-server/
# Make port 80 available to the world outside this container
EXPOSE 4000
# Run the app when the container launches
CMD ["npm", "start"]