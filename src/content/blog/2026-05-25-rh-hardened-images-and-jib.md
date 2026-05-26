---
tags: ["java", "containers"]
pubDate: "2026-05-25"
title: "Red Hat Hardened Images and Jib"
author: Christian Köberl
image: "./images/armored-hummingbird.png"
summary: "Red Hat has recently released Red Hat Hardened Images - a collection of container images that are minimal, distroless, and optimized for security. In this blog post, we will explore how to use these images in combination with Jib to build secure and optimized container images for Java applications."
---

Red Hat has recently released [Red Hat Hardened Images](https://www.redhat.com/en/blog/red-hat-hardened-images) - a collection of container images that are minimal, distroless, and optimized for security. These images are designed to provide a secure foundation for running applications in containers, and they are built using best practices for container security. [Project Hummingbird](https://hummingbird-project.io/) is the upstream project for the Red Hat Hardened Images (hence the header image).

The collections includes images for various programming languages and runtimes, such as Java, Node.js, Python, and more. The images tyically come in different variants: default, builder and fips. The default variant is the minimal image that contains only the necessary components to run the application. The builder variant includes additional tools and libraries that are needed for building and testing applications. The fips variant is designed for use in environments that require compliance with the Federal Information Processing Standards (FIPS). The Java images also incude a "runtime" variant that is optimized for running Java applications (it does not include development tools).

I have used the Java based images in combination with Jib and they play very well together. [Jib](https://github.com/GoogleContainerTools/jib) is a popular open-source tool developed by Google that allows you to build optimized Docker and OCI images for Java applications without a Docker daemon. Jib allows you to build container images for your Java applications directly from your build tool (Maven or Gradle) without the need for a Dockerfile.

## Example Usage

Here is an example of how to use Jib with the Red Hat Hardened Java images in a Spring Boot Maven project:

```xml
<project>
  ...
  <build>
    <plugins>
      <plugin>
        <groupId>com.google.cloud.tools</groupId>
        <artifactId>jib-maven-plugin</artifactId>
        <version>${jib-maven.version}</version>
        <configuration>
          <from>
            <image>registry.access.redhat.com/hi/openjdk:25-runtime</image>
          </from>
          <to>
            <image>registry.example.com/my-java-app:latest</image>
          </to>
          <container>
            <!-- Set JVM flags to optimize memory usage in the container and handle out of memory errors gracefully -->
            <jvmFlags>
              <jvmFlag>-XX:MaxRAMPercentage=70.0</jvmFlag>
              <jvmFlag>-XX:+ExitOnOutOfMemoryError</jvmFlag>
            </jvmFlags>
            <!-- Set consistent working directory (to mount config when deploying) -->
            <workingDirectory>/app</workingDirectory>
            <!-- Set labels to know the metadata of the container image -->
            <labels>
              <name>${project.name}</name>
              <groupId>${project.groupId}</groupId>
              <artifactId>${project.artifactId}</artifactId>
              <version>${project.version}</version>
              <build-date>${maven.build.timestamp}</build-date>
              <vendor>My Company</vendor>
              <distribution-scope>private</distribution-scope>
            </labels>
          </container>
        </configuration>
      </plugin>
    </plugins>
  </build>
</project>
```

With this config you can build your Spring Boot applications using the following command (this will package the application, run the tests and then build the container image and push it to the registry):

```bash
mvn verify jib:build
```

Then you can run the container image using the following command:

```bash
docker run -p 8080:8080 registry.example.com/my-java-app:latest
```

If you need to add configuration files (e.g. application.properties) when deploying the container, you can mount a volume to the config sub-directory of the working directory (/app/config) that we have set in the Jib configuration:

```bash
docker run -v /path/to/config:/app/config -p 8080:8080 registry.example.com/my-java-app:latest
```

This allows you to keep your configuration files separate from your application code and easily update them without having to rebuild the container image. In Kubernetes, you can use a Secret or ConfigMap to mount the configuration files into the container.

## Conclusion

Using Jib with the Red Hat Hardened Java images allows you to build secure, minimal container images for your Java applications without the need for a Dockerfile. This can help you to improve the security and performance of your containerized applications while also simplifying your build process.

## Links

- [Red Hat Hardened Images](https://images.redhat.com/)
- [Project Hummingbird](https://hummingbird-project.io/)
- [Jib](https://github.com/GoogleContainerTools/jib)
