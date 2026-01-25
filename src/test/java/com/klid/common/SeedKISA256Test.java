package com.klid.common;

import org.junit.Test;

import java.util.List;

public class SeedKISA256Test {

    @Test
    public void decryptTest() {
        String[] d = {
                "eb02c71de0d4101ab2b93df265c09814",
                "b4125c11d1abfd70a472d3a3fc7db69a",
                "eb02c71de0d4101ab2b93df265c09814",
                "bcbb12c6bcbf964b1cad99829ab9e314",
                "eb02c71de0d4101ab2b93df265c09814",
                "eb02c71de0d4101ab2b93df265c09814",
                "eb02c71de0d4101ab2b93df265c09814",
                "808f6e3ee47533f1eb186f3d2c60dca1",
                "a842bf0cfb184950445c1c61e621242f",
                "7cc6cfa0961e2593d8c73680666a3254",
                "ef818e4a15dd9c9a5091f0a8bc2bfc4a",
                "c3d9c524c1d9a2f6bbeffa41e5fde398",
                "4ebfce2202147570db018277367e8fb8",
                "15a20f498d70b8669227946c3cdcb35c",
                "9c074d037cee15e623080b4f133c07c9",
                "058d92418bc1cd53c444fc67c7000334",
                "973f984bbaad1d7096b1357e35eaaff9",
                "744c7e49508fea97efde159afdfd5f18",
                "c635b1d50baee216c23c94a999c95338",
                "219b4dfc41be33520f9fdcd942feb029",
                "c80712584c165fda3a08cff7a5f438fa",
                "f311ee064be1048b0480227e4defb37d",
                "99eee483cc815a23a510cf0cf9a1b76a",
                "95321b67d86716cef98c5858c2456f10",
                "e43b99d4269422975e481b101c58f134",
                "0b5e42c6d1fdacee2145ebce085d5136",
                "a42123678da5f0fa74e4961a9ae2ce91",
                "fa259bf4fd676512d69084359c819723",
                "17430c9c5dd9cc776349811339762f45",
                "c89c6cf76934bdf2afae1faf74f0c1b9",
                "e61fd1b7979d2ac8e52d1d5358a75353",
                "eb02c71de0d4101ab2b93df265c09814",
                "e61fd1b7979d2ac8e52d1d5358a75353",
                "c89c6cf76934bdf2afae1faf74f0c1b9",
                "eb02c71de0d4101ab2b93df265c09814",
                "eb02c71de0d4101ab2b93df265c09814",
                "e61fd1b7979d2ac8e52d1d5358a75353",
                "c89c6cf76934bdf2afae1faf74f0c1b9",
                "ed3cb280a5c98babc90558a8c915c678",
                "30f8b7a17423d35a5301ab79a6e0b3d1",
                "eb02c71de0d4101ab2b93df265c09814",
                "eb02c71de0d4101ab2b93df265c09814",
                "e61fd1b7979d2ac8e52d1d5358a75353",
                "eb02c71de0d4101ab2b93df265c09814",
                "eb02c71de0d4101ab2b93df265c09814",
                "130be5972e107896897f30519af45628",
                "c89c6cf76934bdf2afae1faf74f0c1b9",
                "eb02c71de0d4101ab2b93df265c09814",
                "c89c6cf76934bdf2afae1faf74f0c1b9",
                "e61fd1b7979d2ac8e52d1d5358a75353"
        };

        for (String x : d) {
            final String v = SEED_KISA256.Decrypt(x);
            System.out.println(x + "\t" + v);
        }
    }


    @Test
    public void encryptTest() {
        final String x = "abc@abc.com";
        System.out.println(x);

        final String v = SEED_KISA256.Encrypt(x);
        System.out.println(v);
    }

    @Test
    public void etee() {
        String[] s = {"010-4839-1726",
                "010-5927-8641",
                "010-1764-3905",
                "010-2759-6843"};

        for (String z : s) {
            System.out.println(z + "//" + SEED_KISA256.Encrypt(z));
        }
    }    @Test
    public void etee2() {
        String[] s = {
                "010-1234-1234",
                "010-2345-2345",
                "010-3456-3456",
                "010-6789-6789"
        };

        for (String z : s) {
            System.out.println(z + "//" + SEED_KISA256.Encrypt(z));
        }
    }
}