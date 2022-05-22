from cryptography.fernet import Fernet
import argparse

def createKey():
    key = Fernet.generate_key()
    with open("key.key", "wb") as keyFile:
        keyFile.write(key)

def loadKey():
    return open("key.key", "rb").read()


def encryptFile(filename, key):
    f = Fernet(key)
    with open(filename, "rb") as file:
        fileData = file.read()
        buffer = bytes(fileData)
    encryptedData = f.encrypt(buffer)
    with open(filename, "wb") as file:
        file.write(encryptedData)

def decryptFile(filename, key):
    f = Fernet(key)
    with open(filename, "rb") as file:
        encryptedData = file.read()
    decryptedData = f.decrypt(encryptedData)
    with open(filename, "wb") as file:
        file.write(decryptedData)

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="File Encryption/Decryption")
    parser.add_argument("file", help="File to encrypt/decrypt")
    parser.add_argument("-g", "--generate-key", dest="generate_key", action="store_true", help="Whether to generate a new key or use existing")
    parser.add_argument("-e", "--encrypt", action="store_true", help="Whether to encrypt the file, only -e or -d can be specified.")
    parser.add_argument("-d", "--decrypt", action="store_true", help="Whether to decrypt the file, only -e or -d can be specified.")

    args = parser.parse_args()
    file = args.file
    generate_key = args.generate_key

    if generate_key:
        createKey()
    # load the key
    key = loadKey()

    encrypt_ = args.encrypt
    decrypt_ = args.decrypt

    if encrypt_ and decrypt_:
        raise TypeError("Please specify whether you want to encrypt the file or decrypt it.")
    elif encrypt_:
        encryptFile(file, key)
    elif decrypt_:
        decryptFile(file, key)
    else:
        raise TypeError("Please specify whether you want to encrypt the file or decrypt it.")
