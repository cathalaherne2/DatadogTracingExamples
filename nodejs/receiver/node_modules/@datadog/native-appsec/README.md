# dd-native-appsec-js
Node.js bindings for [libddwaf](https://github.com/datadog/libddwaf).

# Supported platforms

This package supports the following platforms:

* **Node.js version:** 12 and higher
* **Operating Systems:**
  * MacOS x64 on intel architectures
  * Windows
    * x86
    * x64
  * Linux
    * x64 with glibc
    * x64 with musl

Therefore, unsupported platforms include:
* AIX
* arm platforms (including Apple M1)
* PPC 

Please feel free to [contact support][support] if you would like to request support for a new platform.

# Install/Reinstall for a specific target

In some situation, one can need to install the package for a specific platform different from the current one.

For instance, this happens when `npm install` is executed on a host machine and then the content of `node_modules` is
copied to a docker image.

In this case, the `appsec-reinstall` script is to be used. It accepts the following arguments:

```
appsec-reinstall [arguments]
Arguments:
        argument      alias
        --help        -h        prints help and exit
        --platform    -p        change platform (based on os.platform()). Default os.platform()
        --arch        -a        change arch (based on os.arch()). Default os.arch()
        --libc        -l        change libc variant. Default to current ones. Values are glibc, musl, unknown
```

[support]: https://docs.datadoghq.com/help
